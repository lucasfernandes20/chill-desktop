import { createAction, props } from '@ngrx/store';
import { type CurrencyExchangeRate } from '@chill-desktop/shared/models';

export const loadCurrencyAction = createAction('[Currency] Load Currency');

export const loadCurrencySuccessAction = createAction(
  '[Currency] Load Currency Success',
  props<{ data: CurrencyExchangeRate }>()
);

export const loadCurrencyFailureAction = createAction('[Currency] Load Currency Failure', props<{ error: string }>());
