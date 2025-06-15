import { createSelector } from '@ngrx/store';
import { type WeatherState } from '../reducers/weather.reducer';

const selectChillDesktopState = (state: Record<string, unknown>) => state;

export const selectWeatherState = createSelector(
  selectChillDesktopState,
  (state: Record<string, unknown>) => state['weather'] as WeatherState
);

export const selectTemperature = createSelector(selectWeatherState, (state: WeatherState) => state?.temperature);

export const selectWeatherCondition = createSelector(
  selectWeatherState,
  (state: WeatherState) => state?.weatherCondition
);
