import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { weatherReducer, type WeatherState } from './weather.reducer';
import { appsReducer, type AppsState } from './apps.reducer';
import { currencyReducer, type CurrencyState } from './currency.reducer';
export { type AppsState, type WeatherState, type CurrencyState };

export const chillDesktopFeatureKey = 'chillDesktop';

export interface State {
  weather: WeatherState;
  apps: AppsState;
  currency: CurrencyState;
}

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer,
  apps: appsReducer,
  currency: currencyReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export * from './apps.reducer';
export * from './currency.reducer';
export * from './weather.reducer';
