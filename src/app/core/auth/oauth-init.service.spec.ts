import { HttpClient } from '@angular/common/http'
import { OAuthService } from 'angular-oauth2-oidc'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockOAuthUser } from 'src/mocks/data-mocks/admin.mock'
import { OAuthInitService } from './oauth-init.service'

describe('OAuth Init Service', () => {
  let initService: OAuthInitService

  const authService = ({
    configure: () => {},
    loadDiscoveryDocumentAndTryLogin: () => Promise.resolve(true),
    setupAutomaticSilentRefresh: () => {},
    loadUserProfile: () => Promise.resolve(mockOAuthUser),
  } as unknown) as OAuthService

  const appConfig = {
    config: {
      auth: {
        baseUrl: 'localhost',
        clientId: 'test-app',
        realm: 'test-realm',
      },
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const httpClient = ({
    get: () => of(),
    post: () => of(),
  } as unknown) as HttpClient

  beforeEach(() => {
    jest.spyOn(authService, 'loadUserProfile')
    jest.spyOn(httpClient, 'post')
    initService = new OAuthInitService(authService, appConfig)
  })

  it('should be created', () => {
    expect(initService).toBeTruthy()
  })

  describe('When OAuth Server gets initialized with success', () => {
    const authConfig = {
      issuer: `${appConfig.config.auth.baseUrl}/auth/realms/${appConfig.config.auth.realm}`,
      clientId: `${appConfig.config.auth.clientId}`,
      responseType: 'code',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email roles',
      useSilentRefresh: true,
      silentRefreshTimeout: 5000,
      timeoutFactor: 0.25,
      sessionChecksEnabled: true,
      clearHashAfterLogin: false,
      nonceStateSeparator: 'semicolon',
    }

    it('Calls init on OAuth Server with correct config and options', async () => {
      jest.spyOn(authService, 'configure')
      jest.spyOn(authService, 'loadDiscoveryDocumentAndTryLogin')
      jest.spyOn(authService, 'setupAutomaticSilentRefresh')

      await initService.initOAuth()

      expect(authService.configure).toHaveBeenCalledWith(authConfig)
      expect(authService.loadDiscoveryDocumentAndTryLogin).toHaveBeenCalled()
      expect(authService.setupAutomaticSilentRefresh).toHaveBeenCalled()
    })
  })

  describe('When OAuth Server gets initialized with no success', () => {
    it('fails', async () => {
      jest.spyOn(authService, 'loadDiscoveryDocumentAndTryLogin').mockImplementation(() => {
        return Promise.reject()
      })

      initService.initOAuth().catch((error) => {
        expect(error).toBeDefined()
      })
    })
  })

  describe('When OAuth Server gets initialized with no success within more than 20 seconds', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('fails', async () => {
      jest.spyOn(authService, 'loadDiscoveryDocumentAndTryLogin').mockImplementation(() => {
        jest.advanceTimersByTime(25_000)
        return Promise.resolve(true)
      })

      initService.initOAuth().catch((error) => {
        expect(error).toBeDefined()
      })
    })
  })
})
