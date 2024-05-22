import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ENVIRONMENT_INITIALIZER } from '@angular/core';

import { appRoutes } from './app.routes';

import { provideToonGalaxyDomain } from '@toon-galaxy/toon-galaxy/domain';

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * It's strongly recommended to enable fetch for applications that uses
     * Server-Side Rendering and/or Static Site Generation SSG/Prerendering,
     * for better performance and compatibility.
     *
     * Prefer withInterceptors and functional interceptors instead of
     * withInterceptorsFromDi, as support for DI-provided interceptors may
     * be phased out in a later release.
     */
    provideHttpClient(withInterceptors([]), withFetch()),
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),

    // NgRx
    provideStore(),
    provideEffects([]),
    ...(isDevMode() ? [provideStoreDevtools()] : []),
    // provideState(),
    provideToonGalaxyDomain(),

    // Perform initialization, has to be last
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {
        // add init logic here...
        // kickstart processes, trigger initial requests or actions, ...
      },
    },
  ],
};
