import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingFacade } from '../+state/loading/loading.facade';

// Loading interceptor root scope
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingFacade = inject(LoadingFacade);

  const requestId = loadingFacade.start();

  return next(req).pipe(
    catchError((error) => {
      loadingFacade.stop(requestId);
      throw error;
    }),
    finalize(() => loadingFacade.stop(requestId)),
  );
};
