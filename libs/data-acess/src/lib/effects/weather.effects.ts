import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadWeather, loadWeatherFailure, loadWeatherSuccess } from '../actions';
import { WeatherService } from '../services/weather.service';
import { Action } from '@ngrx/store';

@Injectable()
export class WeatherEffects implements OnInitEffects {
  constructor(private actions$: Actions) {}

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeather),
      mergeMap(() => this.weatherService.getWeather().pipe(
        map(weather => loadWeatherSuccess({ weather })),
        catchError(error => of(loadWeatherFailure({ error })))
      ))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadWeather();
  }
}