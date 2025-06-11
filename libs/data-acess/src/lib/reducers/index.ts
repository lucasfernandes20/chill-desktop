import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { weatherReducer, type WeatherState } from './weather.reducer';

export const chillDesktopFeatureKey = 'chillDesktop';

export interface State {
  weather: WeatherState;
}

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
