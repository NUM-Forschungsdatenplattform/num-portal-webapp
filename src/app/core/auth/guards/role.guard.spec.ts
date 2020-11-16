import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router'
import { OAuthService, UserInfo } from 'angular-oauth2-oidc'

import { RoleGuard } from './role.guard'

describe('AuthGuardGuard', () => {
  let guard: RoleGuard

  const authService = ({
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    loadUserProfile: () => Promise.resolve({}),
  } as unknown) as OAuthService

  beforeEach(() => {
    guard = new RoleGuard(authService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('When the user is logged in and has required roles', () => {
    const activatedRoute = ({
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as unknown) as ActivatedRouteSnapshot

    const route = {
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as Route
    const state = {} as RouterStateSnapshot

    const userInfo: UserInfo = {
      exp: 1605510743,
      iat: 1605510443,
      auth_time: 1605509889,
      jti: 'cd6db471-5fd0-44e5-a116-1ec9d24be226',
      iss: 'https://temp-keycloak.10.214.4.21.xip.io/auth/realms/Num',
      aud: 'numPortalWebapp',
      sub: '2144dbe9-fccc-44d9-aadd-3735b5ad290f',
      typ: 'ID',
      azp: 'numPortalWebapp',
      nonce: 'amhMNmw0bnFSUWpDc29JUURuUDJuSXVYNHkzQWlVaXBKaXQyR3lwY1NNNW9O',
      session_state: 'c7605fe0-7deb-4f29-8cde-dbf1fc5e6025',
      acr: '0',
      email_verified: true,
      name: 'Test User',
      groups: ['user', 'has', 'required', 'role'],
      preferred_username: 'test@test.com',
      given_name: 'Test',
      family_name: 'User',
      email: 'test@test.com',
    }

    it('grants access to the route in [canActivate] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeTruthy()
      })
    })

    it('grants access to the route in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      const result = await guard.canLoad(route)
      expect(result).toBeTruthy()
    })
  })

  // describe('When the user is logged in and has not the required roles', () => {
  //   const activatedRoute = ({
  //     data: {
  //       roles: ['All', 'required', 'roles'],
  //     },
  //   } as unknown) as ActivatedRouteSnapshot
  //
  //   const route = {
  //     data: {
  //       roles: ['All', 'required', 'roles'],
  //     },
  //   } as Route
  //   const state = {} as RouterStateSnapshot
  //
  //   it('grants no access to the route in [canActivate] guard', () => {
  //     jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true)
  //     jest
  //       .spyOn(keycloak, 'getUserRoles')
  //       .mockImplementation(() => ['user', 'has', 'no required', 'role'])
  //     return guard.canActivate(activatedRoute, state).then((result) => {
  //       expect(result).toBeFalsy()
  //     })
  //   })
  //
  //   it('grants no access to the route in [canLoad] guard', async () => {
  //     jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true)
  //     jest
  //       .spyOn(keycloak, 'getUserRoles')
  //       .mockImplementation(() => ['user', 'has', 'no required', 'role'])
  //     const result = await guard.canLoad(route)
  //     expect(result).toBeFalsy()
  //   })
  // })
  //
  // describe('When the user is not logged in', () => {
  //   const host = 'http://localhost'
  //   const path = 'test/url'
  //   const activatedRoute = ({
  //     data: {
  //       roles: ['All', 'required', 'roles'],
  //     },
  //   } as unknown) as ActivatedRouteSnapshot
  //
  //   const route = {
  //     path,
  //     data: {
  //       roles: ['All', 'required', 'roles'],
  //     },
  //   } as Route
  //
  //   const state = {
  //     url: path,
  //   } as RouterStateSnapshot
  //
  //   it('calls keycloak.login to let the user login in [canActivate] guard', async () => {
  //     jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false)
  //     jest.spyOn(keycloak, 'login')
  //     jest.spyOn(keycloak, 'getUserRoles')
  //
  //     const result = await guard.canActivate(activatedRoute, state)
  //     expect(keycloak.login).toHaveBeenCalledWith({
  //       redirectUri: host + state.url,
  //     })
  //   })
  //
  //   it('calls keycloak.login to let the user login in [canLoad] guard', async () => {
  //     jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false)
  //     jest.spyOn(keycloak, 'login')
  //     jest.spyOn(keycloak, 'getUserRoles')
  //
  //     const result = await guard.canLoad(route)
  //     expect(keycloak.login).toHaveBeenCalledWith({
  //       redirectUri: host + '/' + path,
  //     })
  //   })
  // })
  //
  // describe('When no roles are specified', () => {
  //   const path = 'test/url'
  //   const activatedRoute = ({} as unknown) as ActivatedRouteSnapshot
  //
  //   const route = {
  //     path,
  //   } as Route
  //
  //   const state = {
  //     url: path,
  //   } as RouterStateSnapshot
  //
  //   it('it grants access to the route in [canActivate] guard', async () => {
  //     const result = await guard.canActivate(activatedRoute, state)
  //     expect(result).toBeTruthy()
  //   })
  //
  //   it('it grants access to the route in [canLoad] guard', async () => {
  //     const result = await guard.canLoad(route)
  //     expect(result).toBeTruthy()
  //   })
  // })
})
