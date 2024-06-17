import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingFacade } from '../+state/loading/loading.facade';

// Loading interceptor root scope
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingFacade = inject(LoadingFacade);

  loadingFacade.start();

  return next(req).pipe(
    finalize(() => loadingFacade.stop()),
    catchError((error) => {
      loadingFacade.stop();
      throw error;
    }),
  );

  //
  //
  // activeRequests = 0;
  // private totalRequests = 0;

  // if (this.activeRequests === 0) {
  //   this.store.dispatch(LoadingActions.startLoading());
  // }
  //
  // this.activeRequests++;
  // this.totalRequests++;
  //
  // return next.handle(req).pipe(
  //   finalize(() => {
  //     this.activeRequests--;
  // this.totalRequests--;

  //     if (this.activeRequests === 0) {
  //       this.store.dispatch(LoadingActions.stopLoading());
  //     }
  //   }),
  // );
};
