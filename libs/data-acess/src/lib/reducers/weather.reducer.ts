import { createReducer, on } from '@ngrx/store';
import { type Weather } from '@chill-desktop/shared/models';
import { loadWeather, loadWeatherFailure, loadWeatherSuccess } from '../actions';

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
  on(loadWeather, state => ({ ...state, loading: true })),
  on(loadWeatherSuccess, (state, { data }) => ({
    ...state,
    weather: data,
    loading: false,
  })),
  on(loadWeatherFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
