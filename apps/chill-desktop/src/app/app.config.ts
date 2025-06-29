import { ApplicationConfig, provideZoneChangeDetection, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers, WeatherEffects, CurrencyEffects } from '@chill-desktop/data-acess';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { APP_ENVIRONMENT } from '@chill-desktop/shared/app-environment';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },

    // NgRx configuration
    provideStore(reducers),
    provideEffects([WeatherEffects, CurrencyEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
};
