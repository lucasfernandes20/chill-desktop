import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadCurrencyAction, loadCurrencyFailureAction, loadCurrencySuccessAction } from '../actions';
import { Action } from '@ngrx/store';
import { CurrencyService } from '@chill-desktop/services';

@Injectable()
export class CurrencyEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly currencyService = inject(CurrencyService);

  ngrxOnInitEffects(): Action {
    return loadCurrencyAction();
  }

  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyAction),
      switchMap(() =>
        this.currencyService.getCurrencyExchangeRate().pipe(
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
}
