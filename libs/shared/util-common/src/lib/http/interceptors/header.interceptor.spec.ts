import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpHandler,
  HttpHandlerFn,
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
import { headerInterceptor } from './header.interceptor';
import { Observable, of } from 'rxjs';

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

  // it('should add Content-Type header if not present', () => {
  //   const mockReq = new HttpRequest('GET', '/api/data');
  //   const mockHttpHandler: HttpHandlerFn = (
  //     req: HttpRequest<any>,
  //   ): Observable<HttpResponse<any>> => {
  //     // Mock responses based on request URL, method, etc.
  //     if (req.url.endsWith('/api/data') && req.method === 'GET') {
  //       const mockData = { message: 'Mocked response' };
  //       return of(new HttpResponse({ status: 200, body: mockData }));
  //     } else {
  // Handle other requests or return mock errors as needed
  //       return of(new HttpResponse({ status: 404, statusText: 'Not Found' }));
  //     }
  //   };
  //   // Observable<HttpEvent<unknown>>;
  //   const intercepted = headerInterceptor(mockReq, mockHttpHandler);

  //   const intercepted2 = interceptor(mockReq, mockHttpHandler);
  //   // const intercepted = interceptor(mockReq, (req) => of(mockReq));
  //   // const intercepted = interceptor(mockReq, (req) => mockReq);
  //   // Assert the headers were modified as expected
  //   // expect(intercepted.request.headers.has('Content-Type')).toBe(true);
  //   expect(intercepted.request.headers.has('Content-Type')).toBe(true);
  //   expect(intercepted2.request.headers.get('Content-Type')).toEqual(
  //     'application/json',
  //   );
  // });

  it('should add auth headers ', () => {
    //arrange
    const url = '/mockendpoint';

    //act
    httpClient.get(url).subscribe();

    // assert
    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
  });
});

// describe('AuthInterceptor', () => {

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         provideHttpClient(withInterceptors([headerInterceptor])),
//         provideHttpClientTesting(),
//       ],
//     });
//     httpTestingController = TestBed.inject(HttpTestingController);
//     httpClient = TestBed.inject(HttpClient);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should add auth headers ', () => {
//     //arrange
//     const url = '/mockendpoint';

//     //act
//     httpClient.get(url).subscribe();

//     // assert
//     const req = httpTestingController.expectOne(url);
//     expect(req.request.headers.get('Authorization')).toEqual(
//       'Bearer [the token]',
//     );
//   });
// });
