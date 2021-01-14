import { HttpClient } from '@angular/common/http'
import { OAuthService } from 'angular-oauth2-oidc'
import { of } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockOAuthUser } from 'src/mocks/data-mocks/admin.mock'
import { AuthService } from './auth.service'

describe('Auth Service', () => {
  let authService: AuthService

  const mockEvent = {
    type: 'token_received',
  }

  const oauthService = ({
    logOut: () => {},
    initCodeFlow: () => {},
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    events: of(mockEvent),
    loadUserProfile: () => of(mockOAuthUser),
  } as unknown) as OAuthService

  const httpClient = ({
    post: () => of(),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    authService = new AuthService(oauthService, appConfig, httpClient)
  })

  it('should be created', () => {
    expect(authService).toBeTruthy()
  })

  describe('When the user wants to login', () => {
    it('Calls the initCodeFlow method', () => {
      jest.spyOn(oauthService, 'initCodeFlow')

      authService.login()

      expect(oauthService.initCodeFlow).toHaveBeenCalled()
    })
  })

  describe('When the user wants to logout', () => {
    it('Calls the logOut method', () => {
      jest.spyOn(oauthService, 'logOut')

      authService.logout()

      expect(oauthService.logOut).toHaveBeenCalled()
    })
  })
})
