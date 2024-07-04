import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  isDevMode,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  NoPreloading,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  errorInterceptor,
  headerInterceptor,
  loadingInterceptor,
  provideSharedUtilCommon,
} from '@toon-galaxy/shared/util-common';
import { provideToonGalaxyDomain } from '@toon-galaxy/toon-galaxy/domain';

import { appRoutes } from './app.routes';

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
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        headerInterceptor,
        errorInterceptor,
      ]),
      withFetch(),
    ),
    provideClientHydration(
      /**
       * NOTE: event replay is in developer preview in NG 18
       */
      withEventReplay(),
    ),
    provideRouter(
      appRoutes,
      // Uncomment for smother view transitions
      // withViewTransitions(),

      withPreloading(NoPreloading),
      // withRouterConfig({
      //   onSameUrlNavigation: 'reload',
      // }),
      // withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      // withDebugTracing(), // should be disabled in production
    ),
    provideAnimationsAsync(),

    /**
     * NgRx
     * It's recommended to use provideState to register features - while the
     * provideStore can be keep empty
     */
    provideStore(),
    provideEffects([]),
    ...(isDevMode() ? [provideStoreDevtools()] : []),
    // Feature States and Effects
    provideToonGalaxyDomain(),
    provideSharedUtilCommon(),

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
