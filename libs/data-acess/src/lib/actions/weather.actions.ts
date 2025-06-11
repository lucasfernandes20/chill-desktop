import { createAction, props } from '@ngrx/store';
import { type Weather } from '@chill-desktop/shared/models';

export const loadWeatherAction = createAction('[Weather] Load Weather');

export const loadWeatherSuccessAction = createAction(
  '[Weather] Load Weather Success',
  props<{ data: Weather }>()
);

export const loadWeatherFailureAction = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);
