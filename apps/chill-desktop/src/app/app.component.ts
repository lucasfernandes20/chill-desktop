import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Temperature, WeatherCondition } from '@chill-desktop/shared/models';

// Interface mínima para o tipo State
interface AppState {
  weather: {
    weather: {
      temperature?: Temperature;
      weatherCondition?: WeatherCondition;
    } | null;
  };
}

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe, CommonModule],
  selector: 'app-root',
  template: `
    <div *ngIf="temperature$ | async as temperature" class="weather-info">
      <p>Temperatura: {{ temperature.degrees }}{{ temperature.unit }}</p>
      <p *ngIf="weatherCondition$ | async as condition">
        Condição: {{ condition.description.text }}
      </p>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .weather-info {
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  temperature$: Observable<Temperature | undefined>;
  weatherCondition$: Observable<WeatherCondition | undefined>;

  constructor(private store: Store<AppState>) {
    this.temperature$ = this.store.select(state => state.weather.weather?.temperature);
    this.weatherCondition$ = this.store.select(state => state.weather.weather?.weatherCondition);
  }
}
