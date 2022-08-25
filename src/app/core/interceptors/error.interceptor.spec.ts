import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { inject, TestBed } from '@angular/core/testing'
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc'
import { OAuthInterceptor } from './oauth.interceptor'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ErrorInterceptor } from './error.interceptor'
import { AuthService } from '../auth/auth.service'

describe('ErrorInterceptor', () => {
  let errorInterceptor: ErrorInterceptor

  const authService = {
    logout: () => {},
  } as unknown as AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: errorInterceptor,
          multi: true,
        },
      ],
    })

    errorInterceptor = new ErrorInterceptor(authService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(errorInterceptor).toBeTruthy()
  })

  describe('When the Backend returns 401: Unauthorized', () => {
    it('should logout the user', inject(
      [HttpClient, HttpTestingController, AuthService],
      (http: HttpClient, httpMock: HttpTestingController, injectedAuthService: AuthService) => {
        const mockErrorResponse = { status: 401, statusText: 'Unauthorized' }
        const data = 'Unauthorized'

        jest.spyOn(injectedAuthService, 'logout')

        http.get('/data').subscribe()

        httpMock.expectOne('/data').flush(data, mockErrorResponse)
        expect(injectedAuthService.logout).toHaveBeenCalled()
      }
    ))
  })
})
