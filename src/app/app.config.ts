import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

//localizacion y configuracion
import localeES from '@angular/common/locales/es';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environments';

import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
registerLocaleData(localeES, 'es');

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  {provide:LOCALE_ID, useValue:'es'}, 
  importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
  {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.siteKey,
  },]
};
