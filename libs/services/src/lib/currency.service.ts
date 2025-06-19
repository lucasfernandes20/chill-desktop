import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import {
  AppEnvironment,
  CurrencyApiResponse,
  currencyApiResponseToCurrencyExchangeRate,
  type CurrencyExchangeRate,
} from '@chill-desktop/shared/models';
import { APP_ENVIRONMENT } from '@chill-desktop/shared/app-environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment
  ) {}

  public getCurrencyExchangeRate(): Observable<CurrencyExchangeRate> {
    return this.http
      .get<CurrencyApiResponse>(this.appEnvironment.currencyApiUrl)
      .pipe(map(currencyApiResponseToCurrencyExchangeRate), delay(2000));
  }
}
