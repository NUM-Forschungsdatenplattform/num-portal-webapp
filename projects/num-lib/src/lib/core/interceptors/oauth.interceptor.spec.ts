/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { inject, TestBed } from '@angular/core/testing'
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc'
import { OAuthInterceptor } from './oauth.interceptor'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('OAuthInterceptor', () => {
  let authInterceptor: OAuthInterceptor

  const authStorage = {
    getItem: (_accessToken: string) => 'test_token',
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

        httpMock.expectOne((r) => !r.headers.keys().includes('Authorization'))
      }
    ))
  })
  describe('When the Backend returns 401: Unauthorized', () => {
    it('should logout the user', inject(
      [HttpClient, HttpTestingController, OAuthService],
      (http: HttpClient, httpMock: HttpTestingController, injectedAuthService: OAuthService) => {
        const mockErrorResponse = { status: 401, statusText: 'Unauthorized' }
        const data = 'Unauthorized'

        jest.spyOn(injectedAuthService, 'logOut')

        http.get('/data').subscribe()

        httpMock.expectOne('/data').flush(data, mockErrorResponse)
        expect(injectedAuthService.logOut).toHaveBeenCalled()
      }
    ))
  })

  describe('When the Backend returns another error', () => {
    it('should not logout the user', inject(
      [HttpClient, HttpTestingController, OAuthService],
      (http: HttpClient, httpMock: HttpTestingController, injectedAuthService: OAuthService) => {
        const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' }
        const data = 'Internal Server Error'

        jest.spyOn(injectedAuthService, 'logOut')

        http.get('/data').subscribe()

        httpMock.expectOne('/data').flush(data, mockErrorResponse)
        expect(injectedAuthService.logOut).not.toHaveBeenCalled()
      }
    ))
  })
})
