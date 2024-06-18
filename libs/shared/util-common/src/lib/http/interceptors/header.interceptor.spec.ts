import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { headerInterceptor } from './header.interceptor';

describe('headerInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => headerInterceptor(req, next));
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([headerInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Content-Type header if not present', () => {
    const url = '/mockendpoint';

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Content-Type')).toBe(true);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');

    req.flush({ message: 'Mocked response' });
  });
});
