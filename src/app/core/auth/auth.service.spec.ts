import { OAuthService } from 'angular-oauth2-oidc'
import { AuthService } from './auth.service'

describe('Auth Service', () => {
  let authService: AuthService

  const oauthService = ({
    logOut: () => {},
    initCodeFlow: () => {},
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
  } as unknown) as OAuthService

  beforeEach(() => {
    authService = new AuthService(oauthService)
  })

  it('should be created', () => {
    expect(authService).toBeTruthy()
  })

  describe('When User wants to login', () => {
    it('Calls initCodeFlow method', () => {
      jest.spyOn(oauthService, 'initCodeFlow')

      authService.login()

      expect(oauthService.initCodeFlow).toHaveBeenCalled()
    })
  })

  describe('When User wants to logout', () => {
    it('Calls logOut method', () => {
      jest.spyOn(oauthService, 'logOut')
      jest.spyOn(oauthService, 'initCodeFlow')

      authService.logout()

      expect(oauthService.logOut).toHaveBeenCalled()
    })
  })
})
