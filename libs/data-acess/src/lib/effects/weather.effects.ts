import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadWeatherAction, loadWeatherFailureAction, loadWeatherSuccessAction } from '../actions';
import { Action } from '@ngrx/store';
import { WeatherService } from '@chill-desktop/services';
@Injectable()
export class WeatherEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly weatherService = inject(WeatherService);

  ngrxOnInitEffects(): Action {
    return loadWeatherAction();
  }

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeatherAction),
      mergeMap(() =>
        this.weatherService.getWeather({ latitude: -20.9649664, longitude: -49.1716608 }).pipe(
          map((data) => loadWeatherSuccessAction({ data })),
          catchError(() =>
            of(
              loadWeatherFailureAction({
                error: 'Erro ao carregar dados do clima',
              })
            )
          )
        )
      )
    )
  );
}
