import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, distinctUntilChanged, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  changeCurrencyAction,
  changeTargetCurrencyAction,
  loadCurrencyAction,
  loadCurrencyFailureAction,
  loadCurrencySuccessAction,
} from '../actions';
import { Action, Store } from '@ngrx/store';
import { CurrencyService } from '@chill-desktop/services';
import { selectCurrencyData } from '../selectors';
import { CurrencyExchangeRate } from '@chill-desktop/shared/models';

@Injectable()
export class CurrencyEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly currencyService = inject(CurrencyService);
  private readonly store = inject(Store);

  ngrxOnInitEffects(): Action {
    return loadCurrencyAction({ fromCurrency: 'USD', toCurrency: 'BRL' });
  }

  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyAction),
      switchMap((action) =>
        this.currencyService.getCurrencyExchangeRate(action.fromCurrency, action.toCurrency).pipe(
          map((data) => loadCurrencySuccessAction({ data })),
          catchError(() =>
            of(
              loadCurrencyFailureAction({
                error: 'Erro ao carregar dados de câmbio',
              })
            )
          )
        )
      )
    )
  );

  changeCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeCurrencyAction),
      withLatestFrom(this.store.select(selectCurrencyData)),
      distinctUntilChanged(
        ([action, currency]) =>
          action.fromCurrency === currency?.fromCurrency && action.toCurrency === currency?.toCurrency
      ),
      filter(([, currency]) => !!currency),
      switchMap(([action, currency]: [{ fromCurrency: string; toCurrency: string }, CurrencyExchangeRate]) => {
        if (currency.fromCurrency !== action.fromCurrency) {
          return of(
            loadCurrencyAction({
              fromCurrency: action.fromCurrency,
              toCurrency: action.toCurrency,
            })
          );
        } else {
          return of(
            changeTargetCurrencyAction({
              targetRate: currency.rates[action.toCurrency.toLowerCase()],
              toCurrency: action.toCurrency,
            })
          );
        }
      })
    )
  );
}
