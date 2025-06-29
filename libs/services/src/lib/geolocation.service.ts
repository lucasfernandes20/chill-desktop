import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, timeout, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp: number; // Controla a idade do cache
  source: 'geolocation' | 'default'; // Identifica a origem da localização
}

export interface GeolocationError {
  code: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly cacheService = inject(CacheService);
  private readonly STORAGE_KEY = 'user-location';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em ms

  private readonly defaultPosition: UserLocation = {
    latitude: -23.5558, // São Paulo como fallback
    longitude: -46.6396,
    timestamp: Date.now(),
    source: 'default',
  };

  /**
   * Obtém a posição do usuário, usando cache se disponível e válido
   * @param forceRefresh Se true, força uma nova requisição ignorando o cache
   * @param timeoutMs Timeout em millisegundos (padrão: 15000ms - aumentado para dar mais tempo)
   * @returns Observable com a posição do usuário
   */
  getCurrentPosition(forceRefresh = false, timeoutMs = 15000): Observable<UserLocation> {
    if (!forceRefresh) {
      const cachedLocation = this.cacheService.get<UserLocation>(this.STORAGE_KEY, this.CACHE_DURATION);
      if (cachedLocation) {
        return of(cachedLocation);
      }
    }

    return this.fetchNewLocation(timeoutMs);
  }

  /**
   * Força a busca de uma nova localização, ignorando o cache
   * @param timeoutMs Timeout em millisegundos
   * @returns Observable com a nova posição
   */
  refreshLocation(timeoutMs = 15000): Observable<UserLocation> {
    return this.getCurrentPosition(true, timeoutMs);
  }

  /**
   * Verifica se o navegador suporta geolocalização e o status das permissões
   */
  async checkGeolocationSupport(): Promise<{
    supported: boolean;
    permission?: PermissionState;
    error?: string;
  }> {
    if (!navigator.geolocation) {
      return { supported: false, error: 'Geolocalização não suportada pelo navegador' };
    }

    try {
      // Verifica permissões se disponível
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        return { supported: true, permission: permission.state };
      }

      return { supported: true };
    } catch (error) {
      console.warn('⚠️ Erro ao verificar permissões:', error);
      return { supported: true, error: 'Não foi possível verificar permissões' };
    }
  }

  /**
   * Limpa o cache de localização armazenado
   */
  clearLocationCache(): void {
    this.cacheService.remove(this.STORAGE_KEY);
  }

  private fetchNewLocation(timeoutMs: number): Observable<UserLocation> {
    if (!navigator.geolocation) {
      const fallbackLocation: UserLocation = {
        ...this.defaultPosition,
        timestamp: Date.now(),
        source: 'default' as const,
      };
      this.cacheService.set(this.STORAGE_KEY, fallbackLocation);
      return of(fallbackLocation);
    }

    return new Observable<UserLocation>((observer) => {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 0,
      };

      const successCallback = (position: GeolocationPosition) => {
        const userLocation: UserLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
          source: 'geolocation' as const,
        };

        observer.next(userLocation);
        observer.complete();
      };

      const errorCallback = () => {
        const fallbackLocation: UserLocation = {
          ...this.defaultPosition,
          timestamp: Date.now(),
          source: 'default' as const,
        };
        observer.next(fallbackLocation);
        observer.complete();
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    }).pipe(
      timeout(timeoutMs),
      tap((location) => {
        this.cacheService.set(this.STORAGE_KEY, location);
      }),
      catchError(() => {
        const fallbackLocation: UserLocation = {
          ...this.defaultPosition,
          timestamp: Date.now(),
          source: 'default' as const,
        };
        this.cacheService.set(this.STORAGE_KEY, fallbackLocation);
        return of(fallbackLocation);
      })
    );
  }
}
