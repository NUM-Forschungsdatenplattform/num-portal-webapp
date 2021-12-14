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

import { ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'

import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard
  const authService = {
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    loadDiscoveryDocumentAndLogin: () => Promise.resolve(true),
  } as OAuthService

  beforeEach(() => {
    guard = new AuthGuard(authService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('When the user is logged in', () => {
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
