import { InjectionToken } from '@angular/core';
import { AppEnvironment } from '@chill-desktop/shared/models';

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
