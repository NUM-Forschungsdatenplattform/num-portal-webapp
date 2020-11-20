import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'

import { RoleGuard } from './role.guard'

describe('RoleGuard', () => {
  let guard: RoleGuard

  const authService = ({
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    loadUserProfile: () => Promise.resolve({}),
    loadDiscoveryDocumentAndLogin: () => Promise.resolve(true),
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

    const userInfo = {
      sub: 'sub123-456',
      groups: ['user', 'has', 'required', 'role'],
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

  describe('When the user is logged in and has not the required roles', () => {
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

    const userInfo = {
      sub: 'sub123-456',
      groups: ['user', 'has', 'no required', 'role'],
    }

    it('grants no access to the route in [canActivate] guard', () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeFalsy()
      })
    })

    it('grants no access to the route in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      const result = await guard.canLoad(route)
      expect(result).toBeFalsy()
    })
  })

  describe('When the user is logged in and has no roles specified', () => {
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

    const userInfo = {
      sub: 'sub123-456',
      groups: undefined,
    }

    it('grants no access to the route in [canActivate] guard', () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeFalsy()
      })
    })

    it('grants no access to the route in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      const result = await guard.canLoad(route)
      expect(result).toBeFalsy()
    })
  })

  describe('When the user is not logged in', () => {
    const host = 'http://localhost'
    const path = 'test/url'
    const activatedRoute = ({
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as unknown) as ActivatedRouteSnapshot

    const route = {
      path,
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as Route

    const state = {
      url: path,
    } as RouterStateSnapshot

    it('calls authService.loadDiscoveryDocumentAndLogin to let the user login in [canActivate] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(false)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile')
      jest.spyOn(authService, 'loadDiscoveryDocumentAndLogin')

      const result = await guard.canActivate(activatedRoute, state)
      expect(authService.loadDiscoveryDocumentAndLogin).toHaveBeenCalledWith({
        customRedirectUri: host + state.url,
      })
    })

    it('calls authService.loadDiscoveryDocumentAndLogin to let the user login in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(false)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(authService, 'loadUserProfile')
      jest.spyOn(authService, 'loadDiscoveryDocumentAndLogin')

      const result = await guard.canLoad(route)
      expect(authService.loadDiscoveryDocumentAndLogin).toHaveBeenCalledWith({
        customRedirectUri: host + '/' + path,
      })
    })
  })

  describe('When no roles are specified', () => {
    const path = 'test/url'
    const activatedRoute = ({} as unknown) as ActivatedRouteSnapshot

    const route = {
      path,
    } as Route

    const state = {
      url: path,
    } as RouterStateSnapshot

    it('it grants access to the route in [canActivate] guard', async () => {
      const result = await guard.canActivate(activatedRoute, state)
      expect(result).toBeTruthy()
    })

    it('it grants access to the route in [canLoad] guard', async () => {
      const result = await guard.canLoad(route)
      expect(result).toBeTruthy()
    })
  })
})
