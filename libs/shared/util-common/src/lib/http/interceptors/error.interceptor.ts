import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@toon-galaxy/env/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const snackBar = inject(MatSnackBar);

  const openSnackBar = (message: string): void => {
    snackBar.open(message, 'Close', {
      duration: 5000,
    });
  };

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({ body: event.body.response });
      }
      return event;
    }),
    catchError((error: HttpErrorResponse | Error) => {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = getHttpErrorMessage(error, req.url);
        if (errorMessage) {
          openSnackBar(errorMessage);
        }
      } else if (error instanceof Error) {
        openSnackBar(`An unexpected error occurred: ${error.message}`);
      } else {
        openSnackBar('An unknown error occurred. Please try again later.');
      }
      return throwError(() => error);
    }),
  );
};

const getHttpErrorMessage = (
  error: HttpErrorResponse,
  url: string,
): string | null => {
  switch (error.status) {
    case 404:
      if (!url.startsWith(environment.BASE_API_URL)) {
        return 'The requested resource could not be found.';
      }
      break;
    case 403:
      return 'You do not have permission to access this resource.';
    case 400:
      return 'There was an error with your request. Please check the input and try again.';
    case 503:
    case 502:
    case 501:
    case 500:
    case 401:
      return 'An unexpected server error ocurred.';
    default:
      return 'An unexpected request error occurred. Please verify your internet.';
  }
  return null;
};
