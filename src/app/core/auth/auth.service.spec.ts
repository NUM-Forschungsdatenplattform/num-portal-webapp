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

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Idle } from '@ng-idle/core'
import { Keepalive } from '@ng-idle/keepalive'
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc'
import { of, Subject, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAuthUserProfile } from 'src/app/shared/models/user/auth-user-profile.interface'
import { mockOAuthUser, mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { ProfileService } from '../services/profile/profile.service'
import { AuthService } from './auth.service'

describe('Auth Service', () => {
  let authService: AuthService

  const mockEvent = {
    type: 'token_received',
  }

  let eventSubject: Subject<any>

  const mockAuthProfile: IAuthUserProfile = {
    info: mockOAuthUser,
  }

  const oauthService = {
    logOut: () => {},
    initCodeFlow: () => {},
    state: undefined,
    hasValidIdToken: jest.fn().mockImplementation(() => true),
    hasValidAccessToken: jest.fn().mockImplementation(() => true),
    loadUserProfile: jest.fn().mockImplementation(() => of(mockAuthProfile)),
  } as unknown as OAuthService

  const httpClient = {
    get: jest.fn(),
    post: jest.fn().mockImplementation(() => of()),
  } as unknown as HttpClient

  const profileService = {
    get: jest.fn(),
  } as unknown as ProfileService

  const idle = {
    watch: () => jest.fn(),
    setIdle: () => jest.fn(),
    setTimeout: () => jest.fn(),
    setIdleTime: () => jest.fn(),
    setInterrupts: () => jest.fn(),
    setTimeoutTime: () => jest.fn(),
    onIdleEnd: { subscribe: () => {} },
    onTimeout: { subscribe: () => {} },
  } as unknown as Idle

  const keepAlive = {
    interval: () => jest.fn(),
    onPing: { subscribe: () => {} },
  } as unknown as Keepalive

  const mockRouter = {
    navigate: () => jest.fn(),
  } as unknown as Router

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    authService = new AuthService(
      oauthService,
      profileService,
      appConfig,
      httpClient,
      mockRouter,
      idle,
      keepAlive,
    )
    jest.spyOn(profileService, 'get').mockImplementation(() => of())
    eventSubject = new Subject<OAuthEvent>()
    oauthService.events = eventSubject.asObservable()

    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(authService).toBeTruthy()
  })

  describe('When the user wants to login', () => {
    it('Calls the initCodeFlow method with the redirectUri', () => {
      const redirectUri = 'http://localhost/test'
      jest.spyOn(oauthService, 'initCodeFlow')

      authService.login(redirectUri)

      expect(oauthService.initCodeFlow).toHaveBeenCalledWith(redirectUri)
    })
  })

  describe('When initIdle is called', () => {
    it('initIdle called', () => {
      authService.initIdle()
    })
  })

  describe('When createUser is called', () => {
    it('createUser called', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of())
      authService.createUser('test')
    })
  })

  describe('When createUser is called with error', () => {
    it('createUser called with error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      authService.createUser('test')
    })
  })

  describe('When the user wants goes afk idle process should be used', () => {
    it('Should call the resetIdle method, than logout', () => {
      jest.spyOn(authService, 'initIdle')
      jest.spyOn(authService, 'logout')
      idle.setIdleTime(1)
      idle.setTimeoutTime(1)
      expect(authService.resetIdle).toHaveBeenCalled
      expect(oauthService.logOut).toHaveBeenCalled
    })
  })

  describe('When reseting idle process', () => {
    it('timeout should be set to false', () => {
      jest.spyOn(authService, 'resetIdle')
      authService.resetIdle()
      expect(authService.timedOut).toBeFalsy()
    })
  })

  describe('When the user wants to logout', () => {
    it('Calls the logOut method', () => {
      jest.spyOn(oauthService, 'logOut')

      authService.logout()

      expect(oauthService.logOut).toHaveBeenCalled()
    })
  })

  describe('When the user is logged in and an event is received', () => {
    beforeEach(() => {
      jest.spyOn(oauthService, 'hasValidIdToken').mockImplementation(() => true)
      jest.spyOn(oauthService, 'hasValidAccessToken').mockImplementation(() => true)
      oauthService.state = undefined
      authService.initTokenHandling()
    })
    it('should call the api to refresh the user profile if its a token event', async () => {
      eventSubject.next(mockEvent)
      await Promise.resolve()
      expect(profileService.get).toHaveBeenCalledTimes(1)
    })

    it('should call the api to create the user on the first call if its a token event', (done) => {
      jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(mockAuthProfile)
      jest.spyOn(httpClient, 'post').mockImplementation((post) => {
        expect(true).toBeTruthy()
        done()
        return of()
      })
      eventSubject.next(mockEvent)
    })

    it('should ignore other events', () => {
      const mockEvent2 = {
        type: 'token_expired',
      }
      eventSubject.next(mockEvent2)
      expect(profileService.get).not.toHaveBeenCalled()
    })
  })

  describe('When the tokenhandling gets initialized and a state is present', () => {
    it('should redirect to the state', () => {
      jest.spyOn(mockRouter, 'navigate').mockImplementation()
      const url = 'http://localhost/test'
      oauthService.state = encodeURIComponent(url)
      authService.initTokenHandling()
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test'])
      expect(oauthService.state).toEqual(null)
    })
  })

  describe('When the user is not logged in', () => {
    it('should ignore events', () => {
      jest.spyOn(oauthService, 'hasValidIdToken').mockImplementation(() => false)
      jest.spyOn(oauthService, 'hasValidAccessToken').mockImplementation(() => false)
      oauthService.state = undefined
      authService.initTokenHandling()

      eventSubject.next(mockEvent)
      expect(profileService.get).not.toHaveBeenCalled()
    })
  })
})
