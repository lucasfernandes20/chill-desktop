import { createReducer, on } from '@ngrx/store';
import { StateStatus, type CurrencyExchangeRate } from '@chill-desktop/shared/models';
import {
  changeTargetCurrencyAction,
  loadCurrencyAction,
  loadCurrencyFailureAction,
  loadCurrencySuccessAction,
} from '../actions';

export const CURRENCY_FEATURE_KEY = 'currency';

export interface CurrencyState {
  data: CurrencyExchangeRate;
  status: StateStatus;
  error?: string;
}

const initialState: CurrencyState = {
  status: StateStatus.INITIAL,
  data: {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    rates: {},
    targetRate: 0,
    lastUpdated: new Date(),
  },
};

export const currencyReducer = createReducer(
  initialState,
  on(loadCurrencyAction, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadCurrencySuccessAction, (state, { data }) => ({
    ...state,
    data,
    status: StateStatus.SUCCESS,
  })),
  on(loadCurrencyFailureAction, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error: error,
  })),
  on(changeTargetCurrencyAction, (state, { targetRate, toCurrency }) => ({
    ...state,
    data: {
      ...state.data,
      targetRate,
      toCurrency,
    },
  }))
);
