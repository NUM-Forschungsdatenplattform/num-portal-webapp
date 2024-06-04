import { ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockUserProfile1, mockUserProfileUnapproved } from 'src/mocks/data-mocks/user-profile.mock'
import { ProfileService } from '../../services/profile/profile.service'
import { ToastMessageService } from '../../services/toast-message/toast-message.service'

import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard
  const authService = {
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    loadDiscoveryDocumentAndLogin: () => Promise.resolve(true),
  } as OAuthService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const mockProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
    userNotApproved: true,
  } as unknown as ProfileService

  const mockToastService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(() => {
    guard = new AuthGuard(authService, mockProfileService, mockToastService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('When the user is logged in and the route is not restricted to approved users', () => {
    const activatedRoute = {} as ActivatedRouteSnapshot
    const route = {} as Route
    const state = {} as RouterStateSnapshot

    it('grants access to the route in [canActivate] guard', () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeTruthy()
      })
    })

    it('grants access to the route in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      const result = await guard.canLoad(route)
      expect(result).toBeTruthy()
    })
  })

  describe('When the user is logged in and the route is restricted to approved users', () => {
    const route = {
      data: {
        onlyApprovedUsers: true,
      },
    } as Route

    it('grants access to the route in [canLoad] guard when the user is approved', (done) => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      guard.canLoad(route).then((result) => {
        expect(result).toBeTruthy()
        done()
      })

      userProfileSubject$.next(mockUserProfile1)
    })

    it('grants no access to the route in [canLoad] guard when the user is approved', (done) => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      guard.canLoad(route).then((result) => {
        expect(result).toBeFalsy()
        done()
      })

      userProfileSubject$.next(mockUserProfileUnapproved)
    })

    it('the toastMessage is shown in [canLoad] guard when the user is approved', (done) => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(true)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(true)
      jest.spyOn(mockToastService, 'openToast')
      guard.canLoad(route).then((result) => {
        expect(mockToastService.openToast).toHaveBeenCalled()
        expect(result).toBeFalsy()
        done()
      })

      userProfileSubject$.next(mockUserProfileUnapproved)
    })
  })

  describe('When the user is not logged in', () => {
    const host = 'http://localhost'
    const path = 'test/url'
    const activatedRoute = {} as ActivatedRouteSnapshot
    const route = { path } as Route
    const state = {
      url: path,
    } as RouterStateSnapshot

    it('calls authService.loadDiscoveryDocumentAndLogin to let the user login in [canActivate] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(false)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(false)
      jest.spyOn(authService, 'loadDiscoveryDocumentAndLogin')

      await guard.canActivate(activatedRoute, state)
      expect(authService.loadDiscoveryDocumentAndLogin).toHaveBeenCalledWith({
        customRedirectUri: host + state.url,
      })
    })

    it('calls authService.loadDiscoveryDocumentAndLogin to let the user login in [canLoad] guard', async () => {
      jest.spyOn(authService, 'hasValidAccessToken').mockReturnValue(false)
      jest.spyOn(authService, 'hasValidIdToken').mockReturnValue(false)
      jest.spyOn(authService, 'loadDiscoveryDocumentAndLogin')

      await guard.canLoad(route)
      expect(authService.loadDiscoveryDocumentAndLogin).toHaveBeenCalledWith({
        customRedirectUri: host + '/' + path,
      })
    })
  })
})
