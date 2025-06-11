import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type Weather } from '@chill-desktop/shared/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getWeather(): Observable<Weather> {
    return this.http.get<Weather>(
      'https://api.openweathermap.org/data/2.5/weather?q=Sao Paulo&appid=1234567890'
    );
  }
}
