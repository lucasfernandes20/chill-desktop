import { createAction, props } from '@ngrx/store';
import { type CurrencyExchangeRate } from '@chill-desktop/shared/models';

export const loadCurrencyAction = createAction(
  '[Currency] Load Currency',
  props<{ fromCurrency: string; toCurrency: string }>()
);

export const loadCurrencySuccessAction = createAction(
  '[Currency] Load Currency Success',
  props<{ data: CurrencyExchangeRate }>()
);

export const loadCurrencyFailureAction = createAction('[Currency] Load Currency Failure', props<{ error: string }>());

export const changeCurrencyAction = createAction(
  '[Currency] Change Currency',
  props<{ fromCurrency: string; toCurrency: string }>()
);

export const changeTargetCurrencyAction = createAction(
  '[Currency] Change Target Currency',
  props<{ targetRate: number; toCurrency: string }>()
);
