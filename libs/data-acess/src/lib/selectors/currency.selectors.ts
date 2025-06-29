import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_FEATURE_KEY, CurrencyState } from '../reducers/currency.reducer';

export const selectCurrencyState = createFeatureSelector<CurrencyState>(CURRENCY_FEATURE_KEY);

export const selectCurrencyExchange = createSelector(selectCurrencyState, (state: CurrencyState) => state);

export const selectCurrencyData = createSelector(selectCurrencyState, (state: CurrencyState) => state.data);

export const selectCurrencyStatus = createSelector(selectCurrencyState, (state: CurrencyState) => state.status);

export const selectCurrencyError = createSelector(selectCurrencyState, (state: CurrencyState) => state.error);
