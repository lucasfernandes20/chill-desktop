import { createSelector } from '@ngrx/store';
import { type WeatherState } from '../reducers/weather.reducer';

// Seletor para o estado completo
const selectChillDesktopState = (state: Record<string, unknown>) => state;

// Seletor para o estado de weather
export const selectWeatherState = createSelector(
  selectChillDesktopState,
  (state: Record<string, unknown>) => state['weather'] as WeatherState
);

export const selectTemperature = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather?.temperature
);

export const selectWeatherCondition = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather?.weatherCondition
);
