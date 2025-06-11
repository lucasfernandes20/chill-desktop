import { createReducer, on } from '@ngrx/store';
import { type Weather } from '@chill-desktop/shared/models';
import { loadWeatherAction, loadWeatherFailureAction, loadWeatherSuccessAction } from '../actions';

export const WEATHER_FEATURE_KEY = 'weather';

export interface WeatherState {
  weather: Weather | null;
  loading: boolean;
  error: string;
}

export const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: '',
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherAction, state => ({ ...state, loading: true })),
  on(loadWeatherSuccessAction, (state, { data }) => ({
    ...state,
    weather: data,
    loading: false,
  })),
  on(loadWeatherFailureAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
