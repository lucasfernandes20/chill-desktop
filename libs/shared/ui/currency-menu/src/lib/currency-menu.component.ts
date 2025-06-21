import { Component, Input, ViewChild, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { A11yModule } from '@angular/cdk/a11y';
import { Store } from '@ngrx/store';
import { type CurrencyExchangeRate, AVAILABLE_CURRENCIES } from '@chill-desktop/shared/models';
import { changeCurrencyAction, loadCurrencyAction } from '@chill-desktop/data-acess';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'chill-currency-menu',
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    A11yModule,
    ReactiveFormsModule,
  ],
  templateUrl: './currency-menu.component.html',
  styleUrl: './currency-menu.component.scss',
})
export class CurrencyMenuComponent implements OnInit, OnDestroy {
  @Input() currency?: CurrencyExchangeRate;
  @ViewChild(MatMenu, { static: true }) matMenu!: MatMenu;

  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();
  public readonly availableCurrencies = AVAILABLE_CURRENCIES;
  public form = new FormGroup({
    fromCurrency: new FormControl(),
    toCurrency: new FormControl(),
  });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => !!value.fromCurrency && !!value.toCurrency),
        distinctUntilChanged()
      )
      .subscribe(
        (
          selectedCurrency: Partial<{
            fromCurrency: string | null;
            toCurrency: string | null;
          }>
        ) => {
          this.store.dispatch(
            changeCurrencyAction({
              fromCurrency: selectedCurrency.fromCurrency || 'USD',
              toCurrency: selectedCurrency.toCurrency || 'BRL',
            })
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCurrencyName(currencyCode: string): string {
    const currency = AVAILABLE_CURRENCIES.find((c) => c.code === currencyCode);
    return currency?.name || currencyCode;
  }

  onRefresh(): void {
    this.store.dispatch(
      loadCurrencyAction({
        fromCurrency: this.currency?.fromCurrency || 'USD',
        toCurrency: this.currency?.toCurrency || 'BRL',
      })
    );
  }

  formatRate(rate: number): string {
    return rate.toFixed(4);
  }
}
