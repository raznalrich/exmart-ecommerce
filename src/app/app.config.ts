// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpInterceptorService } from './services/interceptors/http-interceptor.service';
import { EnvironmentService } from './environments/environment.service';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalGuardConfiguration,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { Configuration, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { tokenInterceptor } from './services/interceptors/token.interceptor';

const guardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read']
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor]),
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    EnvironmentService,
    {
      provide: MSAL_INSTANCE,
      useFactory: (envService: EnvironmentService) => {
        return new PublicClientApplication({
          auth: {
            clientId: envService.auth.clientId,
            authority: envService.auth.authority,
            redirectUri: envService.auth.redirectUri,
          },
          cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false
          }
        });
      },
      deps: [EnvironmentService]
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: guardConfig
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    HttpInterceptorService
  ]
};
