import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { inject, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ErrorInterceptor } from './error.interceptor'
import { AuthService } from '../auth/auth.service'

describe('ErrorInterceptor', () => {
  let errorInterceptor: ErrorInterceptor

  const authService = {
    logout: () => {},
  } as AuthService

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
})
