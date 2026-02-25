import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectWeatherState, selectCurrencyState } from '@chill-desktop/data-acess';
import { StateStatus } from '@chill-desktop/shared/models';
import { interval, map, Observable, shareReplay, startWith } from 'rxjs';
import { WeatherMenuComponent } from '@chill-desktop/shared/ui/weather-menu';
import { CurrencyMenuComponent } from '@chill-desktop/shared/ui/currency-menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'chill-menu-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, WeatherMenuComponent, CurrencyMenuComponent, MatMenuModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  private readonly store = inject(Store);
  public readonly stateStatus = StateStatus;
  $weather = this.store.select(selectWeatherState);
  $currency = this.store.select(selectCurrencyState);

  $currentDateTime: Observable<Date> = interval(60000).pipe(
    startWith(0),
    map(() => new Date()),
    shareReplay(1)
  );

  isValidDate(value: unknown): value is Date {
    return value instanceof Date;
  }

  formatNumberToDecimal(value: number, decimalPlaces = 2): string {
    return value.toFixed(decimalPlaces);
  }

  formatTemperature(degrees: number, unit: string): string {
    return `${Math.round(degrees)} ${unit}`;
  }
}
