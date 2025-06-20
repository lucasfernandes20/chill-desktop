import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { A11yModule } from '@angular/cdk/a11y';
import { Store } from '@ngrx/store';
import { type CurrencyExchangeRate, AVAILABLE_CURRENCIES } from '@chill-desktop/shared/models';
import { loadCurrencyAction } from '@chill-desktop/data-acess';

@Component({
  selector: 'chill-currency-menu',
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule, MatButtonModule, MatSelectModule, A11yModule],
  templateUrl: './currency-menu.component.html',
  styleUrl: './currency-menu.component.scss',
})
export class CurrencyMenuComponent {
  @Input() currency?: CurrencyExchangeRate;
  @ViewChild(MatMenu, { static: true }) matMenu!: MatMenu;

  private readonly store = inject(Store);
  public readonly availableCurrencies = AVAILABLE_CURRENCIES;

  getCurrencySymbol(currencyCode: string): string {
    const currency = AVAILABLE_CURRENCIES.find((c) => c.code === currencyCode);
    return currency?.symbol || currencyCode;
  }

  getCurrencyName(currencyCode: string): string {
    const currency = AVAILABLE_CURRENCIES.find((c) => c.code === currencyCode);
    return currency?.name || currencyCode;
  }

  getLastUpdatedText(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;

    return date.toLocaleDateString('pt-BR');
  }

  onCurrencyChange(selectedCurrency: string): void {
    console.log('Moeda selecionada:', selectedCurrency);
    // TODO: Implementar ação para alterar moeda
    // Por enquanto, apenas recarrega os dados
    this.store.dispatch(loadCurrencyAction());
  }

  onRefresh(): void {
    this.store.dispatch(loadCurrencyAction());
  }

  getRateChangeIndicator(): 'up' | 'down' | 'neutral' {
    // Por enquanto retorna neutro, mas pode ser expandido para mostrar tendência
    return 'neutral';
  }

  formatRate(rate: number): string {
    return rate.toFixed(4);
  }
}
