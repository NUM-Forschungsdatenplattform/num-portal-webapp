import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router'
import { Subject } from 'rxjs'
import { AuthService } from '../auth.service'

import { RoleGuard } from './role.guard'

describe('RoleGuard', () => {
  let guard: RoleGuard

  const userInfoSubject$ = new Subject<any>()

  const authService = ({
    login: () => {},
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as unknown) as AuthService

  const mockRouter = ({
    navigate: jest.fn(),
  } as unknown) as Router

  beforeEach(() => {
    guard = new RoleGuard(authService, mockRouter)
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
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      userInfoSubject$.next(userInfo)
      return guard
        .canActivate(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result).toBeTruthy()
        })
    })

    it('grants access to the route in [canLoad] guard', async () => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      userInfoSubject$.next(userInfo)
      const result = await guard.canLoad(route)
      expect(result).toBeTruthy()
    })
  })

  describe('When the user is logged in but no userInfo is yet there', () => {
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

    const userInfoUndefined = {
      sub: undefined,
    }

    const userInfoWrongRoles = {
      sub: 'sub123-456',
      groups: ['not', 'what', 'we', 'need'],
    }

    const userInfoCorrect = {
      sub: 'sub123-456',
      groups: ['user', 'has', 'required', 'role'],
    }

    it('grants no access to the route in [canActivate] guard and redirects to home', async (done) => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfoUndefined)
      guard
        .canActivate(activatedRoute, state)
        .toPromise()
        .then(() => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
          done()
        })
      userInfoSubject$.next(userInfoUndefined)
    })

    it('grants no access to the route in [canLoad] guard and redirects to home', async (done) => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfoUndefined)
      guard
        .canLoad(route)
        .toPromise()
        .then(() => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
          done()
        })
      userInfoSubject$.next(userInfoUndefined)
    })

    //

    it('grants access to the route in [canActivate] guard if the userInfo is pushed within 2000ms', async (done) => {
      jest.useFakeTimers()
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfoUndefined)
      guard
        .canActivate(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result).toBeTruthy()
          done()
        })
      jest.advanceTimersByTime(1000)

      userInfoSubject$.next(userInfoCorrect)
    })

    it('grants access to the route in [canLoad] guard if the userInfo is pushed within 2000ms', async (done) => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfoUndefined)
      guard
        .canLoad(route)
        .toPromise()
        .then((result) => {
          expect(result).toBeTruthy()
          done()
        })
      jest.advanceTimersByTime(1000)

      userInfoSubject$.next(userInfoCorrect)
    })

    //

    it('grants no access to the route in [canActivate] guard if the userInfo is pushed within 2000ms with wrong roles', async (done) => {
      jest.useFakeTimers()
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfoUndefined)
      guard
        .canActivate(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result).toBeFalsy()
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
          done()
        })
      jest.advanceTimersByTime(1000)

      userInfoSubject$.next(userInfoWrongRoles)
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

    it('grants no access to the route in [canActivate] guard and redirects to home', async () => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfo)
      await guard.canActivate(activatedRoute, state)
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
    })

    it('grants no access to the route in [canLoad] guard and redirects to home', async () => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      jest.spyOn(mockRouter, 'navigate').mockResolvedValue(true)
      userInfoSubject$.next(userInfo)
      const result = await guard.canLoad(route)
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
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

    const userInfoWithoutRoles = {
      sub: 'sub123-456',
      groups: undefined,
    }

    it('grants no access to the route in [canActivate] guard', (done) => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      userInfoSubject$.next(userInfoWithoutRoles)
      guard
        .canActivate(activatedRoute, state)
        .toPromise()
        .then(() => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
          done()
        })
      userInfoSubject$.next(userInfoWithoutRoles)
    })

    it('grants no access to the route in [canLoad] guard', async (done) => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(true)
      userInfoSubject$.next(userInfoWithoutRoles)

      guard
        .canLoad(route)
        .toPromise()
        .then(() => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'])
          done()
        })
      userInfoSubject$.next(userInfoWithoutRoles)
    })
  })

  describe('When the user is not logged in', () => {
    const activatedRoute = ({
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as unknown) as ActivatedRouteSnapshot

    const route = {
      path: 'test/url',
      data: {
        roles: ['All', 'required', 'roles'],
      },
    } as Route

    const state = {
      url: '/test/url',
    } as RouterStateSnapshot

    it('calls authService.login with the redirect url to let the user login in [canActivate] guard', async () => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(false)
      jest.spyOn(authService, 'login')

      const result = await guard.canActivate(activatedRoute, state)
      expect(authService.login).toHaveBeenCalledWith('http://localhost/test/url')
    })

    it('calls authService.loadDiscoveryDocumentAndLogin to let the user login in [canLoad] guard', async () => {
      jest.spyOn(authService, 'isLoggedIn', 'get').mockReturnValue(false)
      jest.spyOn(authService, 'login')

      const result = await guard.canLoad(route)
      expect(authService.login).toHaveBeenCalledWith('http://localhost/test/url')
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
