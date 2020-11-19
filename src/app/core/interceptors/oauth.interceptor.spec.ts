import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { inject, TestBed } from '@angular/core/testing'
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc'
import { OAuthInterceptor } from './oauth.interceptor'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('OAuthInterceptor', () => {
  let authInterceptor: OAuthInterceptor

  const authStorage = {
    getItem: (_access_token: string) => 'test_token',
  } as OAuthStorage

  const authService = {
    logOut: () => {},
  } as OAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        { provide: OAuthService, useValue: authService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OAuthInterceptor,
          multi: true,
        },
      ],
    })

    authInterceptor = new OAuthInterceptor(authService, authStorage)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy()
  })

  describe('When the intercepted url is not excluded', () => {
    it('should add an Authorization header', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('/data').subscribe((response) => {
          expect(response).toBeTruthy()
        })

        httpMock.expectOne(
          (r) =>
            r.headers.has('Authorization') &&
            r.headers.get('Authorization') === 'Bearer ' + authStorage.getItem('access_token')
        )
      }
    ))
  })
  describe('When the intercepted url is excluded', () => {
    it('should add no Authorization header', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('/assets').subscribe((response) => {
          expect(response).toBeTruthy()
        })

        httpMock.expectOne((r) => r.headers['Authorization'] === undefined)
      }
    ))
  })
  describe('When the Backend returns an error', () => {
    it('should logout the user', inject(
      [HttpClient, HttpTestingController, OAuthService],
      (http: HttpClient, httpMock: HttpTestingController, authService: OAuthService) => {
        const mockErrorResponse = { status: 401, statusText: 'Unauthorized' }
        const data = 'Unauthorized'

        jest.spyOn(authService, 'logOut')

        http.get('/data').subscribe()

        httpMock.expectOne('/data').flush(data, mockErrorResponse)
        expect(authService.logOut).toHaveBeenCalled()
      }
    ))
  })
})
