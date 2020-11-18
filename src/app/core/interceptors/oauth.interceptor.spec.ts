import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { inject, TestBed } from '@angular/core/testing'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { OAuthInterceptor } from './oauth.interceptor'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { of } from 'rxjs'

describe('OAuthInterceptor', () => {
  let authInterceptor: OAuthInterceptor

  const authStorage = {
    getItem: (_access_token: string) => 'test_token',
  } as OAuthStorage

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OAuthInterceptor,
          multi: true,
        },
      ],
    })

    authInterceptor = new OAuthInterceptor(authStorage)
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
})
