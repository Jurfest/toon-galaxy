import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
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
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';

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
      /**
       * NOTE: incremental / partial hydration is a NG 19 preview feature
       */
      // withPartialHydration()
    ),
    provideRouter(
      appRoutes,
      // Uncomment for smother view transitions
      // withViewTransitions(),

      withPreloading(QuicklinkStrategy),
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
    quicklinkProviders,
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

    /**
     * Zone (https://www.npmjs.com/package/zone.js)
     *
     * provideZoneChangeDetection is recommended for NG 18 while zoneless is
     * currently experimental.
     *
     * Using provideExperimentalZonelessChangeDetection():
     *
     * In first attempt, in prod mode, locally, without any other changes rather them
     * removing zone.js from project.json polyfills, resulted in the warning: [Violation]
     * 'requestAnimationFrame' handler took 85ms, in the browser console. Even with the zone.js
     * imported in the project.json the error persists while using provideExperimentalZonelessChangeDetection().
     * In that same situation running on dev mode, the following error could apear in the terminal:
     * NG05000:
     * Angular detected that hydration was enabled for an application that uses a
     * custom or a noop Zone.js implementation. This is not yet a fully supported
     * configuration. Find more at https://angular.dev/errors/NG05000
     *
     * Possible solution while SSR Angular applications are not fully supported
     * in experimental zoneless:
     * https://github.com/marcj/angular-zoneless#readme // has to add async to
     *
     * Also, if not remove import 'zone.js/node'; in the server.ts, in dev mode an error
     * message appears in the terminal:
     * NG0914: The application is using zoneless change detection, but is still loading Zone.js.
     * Consider removing Zone.js to get the full benefits of zoneless. In applications using
     * the Angular CLI, Zone.js is typically included in the "polyfills" section of the
     * angular.json file.
     */
    provideZoneChangeDetection({ eventCoalescing: true }), // Also triggers requestAnimationFrame warning,
    // but not in initial load
    // provideExperimentalZonelessChangeDetection(), // Currently experimental zoneless support (NG 18)
    // provideExperimentalCheckNoChangesForDebug({
    //   interval: 1000, // run change detection every second
    //   useNgZoneOnStable: true, // run it when the NgZone is stable as well
    //   exhaustive: true, // check all components
    // }),

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
