import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { weatherReducer, type WeatherState } from './weather.reducer';
import { appsReducer, type AppsState } from './apps.reducer';

export const chillDesktopFeatureKey = 'chillDesktop';

export interface State {
  weather: WeatherState;
  apps: AppsState;
}

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer,
  apps: appsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
