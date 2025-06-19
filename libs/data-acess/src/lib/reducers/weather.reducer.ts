import { createReducer, on } from '@ngrx/store';
import { StateStatus, type Weather } from '@chill-desktop/shared/models';
import { loadWeatherAction, loadWeatherFailureAction, loadWeatherSuccessAction } from '../actions';

export const WEATHER_FEATURE_KEY = 'weather';

export interface WeatherState {
  data?: Weather;
  status: StateStatus;
  error?: string;
}

const initialState: WeatherState = {
  status: StateStatus.INITIAL,
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherAction, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadWeatherSuccessAction, (state, { data }) => ({
    ...state,
    data,
    status: StateStatus.SUCCESS,
  })),
  on(loadWeatherFailureAction, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error: error,
  }))
);
