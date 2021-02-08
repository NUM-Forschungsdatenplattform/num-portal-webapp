import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { of, Subject } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { mockOAuthUser } from 'src/mocks/data-mocks/admin.mock'
import { ProfileService } from '../services/profile/profile.service'
import { AuthService } from './auth.service'

describe('Auth Service', () => {
  let authService: AuthService

  const mockEvent = {
    type: 'token_received',
  }

  const eventSubject = new Subject()

  const oauthService = ({
    logOut: () => {},
    initCodeFlow: () => {},
    state: undefined,
    hasValidIdToken: jest.fn().mockImplementation(() => true),
    hasValidAccessToken: jest.fn().mockImplementation(() => true),
    events: eventSubject.asObservable(),
    loadUserProfile: jest.fn().mockImplementation(() => of(mockOAuthUser)),
  } as unknown) as OAuthService

  const httpClient = ({
    post: jest.fn(),
  } as unknown) as HttpClient

  const profileService = ({
    get: jest.fn(),
  } as unknown) as ProfileService

  const mockRouter = ({
    navigate: () => jest.fn(),
  } as unknown) as Router

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    authService = new AuthService(oauthService, profileService, appConfig, httpClient, mockRouter)
    jest.spyOn(profileService, 'get').mockImplementation(() => of())
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
      jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(mockOAuthUser)
      jest.spyOn(httpClient, 'post').mockImplementation(() => {
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
