import { HttpInterceptorFn } from '@angular/common/http';

export const loadInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
