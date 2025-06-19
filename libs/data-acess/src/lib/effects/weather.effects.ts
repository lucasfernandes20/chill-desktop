import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadWeatherAction, loadWeatherFailureAction, loadWeatherSuccessAction } from '../actions';
import { Action } from '@ngrx/store';
import { WeatherService, GeolocationService } from '@chill-desktop/services';

@Injectable()
export class WeatherEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly weatherService = inject(WeatherService);
  private readonly geolocationService = inject(GeolocationService);

  ngrxOnInitEffects(): Action {
    return loadWeatherAction();
  }

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeatherAction),
      switchMap(() =>
        this.geolocationService.getCurrentPosition().pipe(
          switchMap((location) =>
            this.weatherService
              .getWeather({
                latitude: location.latitude,
                longitude: location.longitude,
              })
              .pipe(
                map((data) => loadWeatherSuccessAction({ data })),
                catchError((weatherError) =>
                  of(
                    loadWeatherFailureAction({
                      error: `Erro ao carregar dados do clima: ${weatherError.message || weatherError}`,
                    })
                  )
                )
              )
          ),
          catchError((geolocationError) =>
            of(
              loadWeatherFailureAction({
                error: `Erro ao obter localização: ${geolocationError.message || geolocationError}`,
              })
            )
          )
        )
      )
    )
  );
}
