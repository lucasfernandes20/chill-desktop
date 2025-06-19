import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AppEnvironment,
  WeatherApiResponse,
  weatherRequestToWeather,
  type Weather,
} from '@chill-desktop/shared/models';
import { HttpClient } from '@angular/common/http';
import { APP_ENVIRONMENT } from '@chill-desktop/shared/app-environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment
  ) {}

  public getWeather({ latitude, longitude }: { latitude: number; longitude: number }): Observable<Weather> {
    const apiKey = this.appEnvironment.openWeatherApiKey;
    return this.http
      .get<WeatherApiResponse>(
        `https://api.openweathermap.org/data/3.0/onecall?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}&lang=pt`
      )
      .pipe(map(weatherRequestToWeather));
    // return of(MOCK_WEATHER).pipe(map(weatherRequestToWeather), delay(2000));
  }
}
