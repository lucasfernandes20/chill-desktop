import { Inject, Injectable, inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  AppEnvironment,
  WeatherApiResponse,
  weatherRequestToWeather,
  type Weather,
} from '@chill-desktop/shared/models';
import { HttpClient } from '@angular/common/http';
import { APP_ENVIRONMENT } from '@chill-desktop/shared/app-environment';
import { CacheService } from './cache.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly cacheService = inject(CacheService);
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutos em ms
  private readonly STORAGE_KEY = 'weather';

  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment
  ) {}

  public getWeather({
    latitude,
    longitude,
    forceRefresh = false,
  }: {
    latitude: number;
    longitude: number;
    forceRefresh?: boolean;
  }): Observable<Weather> {
    if (!forceRefresh) {
      const cachedWeather = this.cacheService.get<Weather>(this.STORAGE_KEY, this.CACHE_DURATION);
      if (cachedWeather) {
        return of(cachedWeather);
      }
    }

    const apiKey = this.appEnvironment.openWeatherApiKey;
    return this.http
      .get<WeatherApiResponse>(
        `${this.appEnvironment.openWeatherApiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`
      )
      .pipe(
        map(weatherRequestToWeather),
        tap((weather) => {
          this.cacheService.set(this.STORAGE_KEY, weather);
        })
      );
  }

  /**
   * Força a busca de novos dados de weather, ignorando o cache
   */
  public refreshWeather(coordinates: { latitude: number; longitude: number }): Observable<Weather> {
    return this.getWeather({ ...coordinates, forceRefresh: true });
  }

  /**
   * Limpa o cache de weather
   */
  public clearWeatherCache(): void {
    this.cacheService.remove(this.STORAGE_KEY);
  }
}
