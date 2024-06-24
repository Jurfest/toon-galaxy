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

import { LoadingFacade } from '../+state/loading/loading.facade';
import { loadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loadingFacadeMock: Partial<LoadingFacade>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

  beforeEach(() => {
    loadingFacadeMock = {
      start: jest.fn().mockReturnValue('requestId'),
      stop: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        { provide: LoadingFacade, useValue: loadingFacadeMock },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should start and stop the loading indicator', () => {
    httpClient.get('/api/data').subscribe();
    const req = httpTestingController.expectOne('/api/data');
    expect(loadingFacadeMock.start).toHaveBeenCalled();
    req.flush({});
    expect(loadingFacadeMock.stop).toHaveBeenCalledWith('requestId');
  });
});
