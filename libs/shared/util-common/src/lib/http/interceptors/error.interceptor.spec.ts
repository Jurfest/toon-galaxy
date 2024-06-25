import {
  HttpClient,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { errorInterceptor } from './error.interceptor';
import { environment } from '../../environments/environment';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let snackBarOpenMock: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        importProvidersFrom(MatSnackBarModule),
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    snackBarOpenMock = TestBed.inject(MatSnackBar).open as jest.Mock;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it.each([
    {
      error: 400,
      message:
        'There was an error with your request. Please check the input and try again.',
    },
    {
      error: 404,
      message: 'The requested resource could not be found.',
    },
    {
      error: 403,
      message: 'You do not have permission to access this resource.',
    },
    {
      error: 503,
      message: 'An unexpected server error ocurred.',
    },
    {
      error: 502,
      message: 'An unexpected server error ocurred.',
    },
    {
      error: 501,
      message: 'An unexpected server error ocurred.',
    },
    {
      error: 500,
      message: 'An unexpected server error ocurred.',
    },
    {
      error: 401,
      message: 'An unexpected server error ocurred.',
    },
    {
      error: null,
      message:
        'An unexpected request error occurred. Please verify your internet.',
    },
  ])(
    'should display a snackbar with $message message for error %error for generic url',
    ({ error, message }) => {
      const url = 'https://example.com/api/data';
      const errorMessage = message;

      httpClient.get(url).subscribe();

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: error, statusText: 'Not Found' });

      expect(snackBarOpenMock).toHaveBeenCalledTimes(1);
      expect(snackBarOpenMock).toHaveBeenCalledWith(errorMessage, 'Close', {
        duration: 5000,
      });
    },
  );

  it('should not display snackbar for a 404 error for URLs starting with environment.BASE_API_URL', () => {
    const url = environment.BASE_API_URL;

    httpClient.get(url).subscribe();

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found' });

    expect(snackBarOpenMock).toHaveBeenCalledTimes(0);
  });

  it('should handle a successful response', fakeAsync(() => {
    const req = new HttpRequest('GET', 'https://example.com/api/data');
    const response = new HttpResponse({ body: { response: 'Success' } });

    interceptor(req, (req) => of(response)).subscribe((event) => {
      expect(event).toEqual(expect.objectContaining({ body: 'Success' }));
    });

    interceptor(req, (req) => of(response)).subscribe({
      next: (event) => {
        expect(event).toEqual(expect.objectContaining({ body: 'Success' }));
      },
      error: (event) => {
        fail('Expected successful');
      },
    });

    tick();
  }));
});
