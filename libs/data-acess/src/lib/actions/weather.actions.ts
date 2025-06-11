import { createAction, props } from '@ngrx/store';
import { type Weather } from '@chill-desktop/shared/models';

export const loadWeather = createAction('[Weather] Load Weather');

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ data: Weather }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);
