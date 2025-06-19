import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, timeout, tap } from 'rxjs/operators';

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
    // Verifica se temos uma localização válida no cache
    if (!forceRefresh) {
      const cachedLocation = this.getCachedLocation();
      if (cachedLocation && this.isCacheValid(cachedLocation)) {
        return of(cachedLocation);
      }
    }

    // Se não temos cache válido, busca nova localização
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
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('⚠️ Erro ao limpar cache de localização:', error);
    }
  }

  private fetchNewLocation(timeoutMs: number): Observable<UserLocation> {
    // Verifica se a geolocalização está disponível
    if (!navigator.geolocation) {
      console.warn('❌ Geolocalização não suportada pelo navegador. Usando localização padrão.');
      const fallbackLocation: UserLocation = {
        ...this.defaultPosition,
        timestamp: Date.now(),
        source: 'default' as const,
      };
      this.saveLocationToCache(fallbackLocation);
      return of(fallbackLocation);
    }

    return new Observable<UserLocation>((observer) => {
      const options: PositionOptions = {
        enableHighAccuracy: true, // Mudando para true para maior precisão
        timeout: timeoutMs,
        maximumAge: 0, // Não usar cache interno do navegador
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

      const errorCallback = (error: GeolocationPositionError) => {
        console.error('❌ Erro na geolocalização:', {
          code: error.code,
          message: error.message,
          description: this.getErrorMessage(error.code),
        });

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
        // Salva a localização no cache quando obtida com sucesso
        this.saveLocationToCache(location);
      }),
      catchError((error) => {
        console.error('⏰ Timeout ou erro na geolocalização:', error);
        const fallbackLocation: UserLocation = {
          ...this.defaultPosition,
          timestamp: Date.now(),
          source: 'default' as const,
        };
        this.saveLocationToCache(fallbackLocation);
        return of(fallbackLocation);
      })
    );
  }

  private getCachedLocation(): UserLocation | null {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY);
      if (cached) {
        const location = JSON.parse(cached) as UserLocation;
        return location;
      }
    } catch (error) {
      console.warn('⚠️ Erro ao ler cache de localização:', error);
    }
    return null;
  }

  private saveLocationToCache(location: UserLocation): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(location));
    } catch (error) {
      console.warn('⚠️ Erro ao salvar localização no cache:', error);
    }
  }

  private isCacheValid(location: UserLocation): boolean {
    const age = Date.now() - location.timestamp;
    const isValid = age < this.CACHE_DURATION;
    return isValid;
  }

  private getErrorMessage(code: number): string {
    switch (code) {
      case 1:
        return 'Permissão negada pelo usuário - Verifique as configurações do navegador';
      case 2:
        return 'Posição indisponível - GPS ou Wi-Fi podem estar desabilitados';
      case 3:
        return 'Timeout na requisição - A localização demorou muito para responder';
      default:
        return 'Erro desconhecido na geolocalização';
    }
  }
}
