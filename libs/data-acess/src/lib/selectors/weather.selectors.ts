import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FEATURE_KEY, type WeatherState } from '../reducers/weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>(WEATHER_FEATURE_KEY);

export const selectTemperature = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather?.temperature
);

export const selectWeatherCondition = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather?.weatherCondition
);
