import { HttpClient } from '@angular/common/http'
import { OAuthService } from 'angular-oauth2-oidc'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OAuthInitService } from './oauth-init.service'

describe('OAuth Init Service', () => {
  let initService: OAuthInitService

  const httpClient = ({
    get: () => of('what ever'),
  } as unknown) as HttpClient

  const authService = ({
    configure: () => {},
    loadDiscoveryDocumentAndLogin: () => Promise.resolve(true),
    setupAutomaticSilentRefresh: () => {},
  } as unknown) as OAuthService

  const appConfig = {
    config: {
      auth: {
        baseUrl: 'localhost',
        clientId: 'test-app',
        realm: 'test-realm',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    initService = new OAuthInitService(httpClient, authService, appConfig)
  })

  it('should be created', () => {
    expect(initService).toBeTruthy()
  })

  describe('When keycloak gets initialized with success', () => {
    const keycloakConfig = {
      issuer: `${appConfig.config.auth.baseUrl}/auth/realms/${appConfig.config.auth.realm}`,
      clientId: `${appConfig.config.auth.clientId}`,
      responseType: 'code',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email roles',
      useSilentRefresh: true,
      silentRefreshTimeout: 5000,
      timeoutFactor: 0.25,
      sessionChecksEnabled: true,
      showDebugInformation: true,
      clearHashAfterLogin: false,
      nonceStateSeparator: 'semicolon',
    }

    it('Calls init on keycloak with correct config and options', async () => {
      jest.spyOn(authService, 'configure')
      jest.spyOn(httpClient, 'get')

      await initService.initOAuth()

      expect(authService.configure).toHaveBeenCalledWith(keycloakConfig)
      expect(httpClient.get).not.toHaveBeenCalled()
    })
  })

  // describe('When keycloak gets initialized with no success within more than 2 seconds', () => {
  //   const testUrl = `${appConfig.config.auth.baseUrl}/auth/realms/${appConfig.config.auth.realm}`
  //   beforeEach(() => {
  //     jest.useFakeTimers()
  //   })
  //   it('Calls the test url and continues on success with init', async () => {
  //     jest.spyOn(httpClient, 'get')
  //     jest.spyOn(keycloak, 'init').mockImplementation(() => {
  //       jest.advanceTimersByTime(3_000)
  //       return Promise.resolve(true)
  //     })
  //
  //     initService.initKeycloak().then((result) => {
  //       expect(result).toBeDefined()
  //     })
  //     expect(httpClient.get).toHaveBeenCalledWith(testUrl)
  //   })
  //
  //   it('Calls the test url and fails on error', async () => {
  //     jest.spyOn(httpClient, 'get').mockReturnValue(throwError(new Error('Error')))
  //     jest.spyOn(keycloak, 'init').mockImplementation(() => {
  //       jest.advanceTimersByTime(3_000)
  //       return Promise.resolve(true)
  //     })
  //
  //     initService.initKeycloak().catch((error) => {
  //       expect(error).toBeDefined()
  //     })
  //     expect(httpClient.get).toHaveBeenCalledWith(testUrl)
  //   })
  // })
  //
  // describe('When keycloak gets initialized with no success within more than 20 seconds', () => {
  //   beforeEach(() => {
  //     jest.useFakeTimers()
  //   })
  //
  //   it('fails', async () => {
  //     jest.spyOn(keycloak, 'init').mockImplementation(() => {
  //       jest.advanceTimersByTime(25_000)
  //       return Promise.resolve(true)
  //     })
  //
  //     initService.initKeycloak().catch((error) => {
  //       expect(error).toBeDefined()
  //     })
  //   })
  // })
})
