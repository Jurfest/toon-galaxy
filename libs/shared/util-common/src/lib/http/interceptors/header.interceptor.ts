import { HttpInterceptorFn } from '@angular/common/http';

// Header root scope interceptor
export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // Add Content-Type
  if (!req.headers.has('Content-Type')) {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
  }

  return next(req);
};
