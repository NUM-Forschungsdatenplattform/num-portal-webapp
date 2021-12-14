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

import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, Subject, throwError } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockOrganization1 } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'
import { OrganizationResolver } from './organization.resolver'

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver
  const state = {} as RouterStateSnapshot
  const organizationService = {
    get: jest.fn(),
  } as unknown as OrganizationService

  const router = {
    navigate: jest.fn(),
  } as unknown as Router

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  beforeEach(() => {
    resolver = new OrganizationResolver(organizationService, profileService, router)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called and the user has the role SuperAdmin', () => {
    it('should return with an empty ui model if the id was new', (done) => {
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result.error).toBeNull()
          expect(result.organization.id).toBeNull()
          done()
        })

      jest.advanceTimersByTime(1000)
      userProfileSubject$.next(mockUserProfile3)
    })

    it('should return with the organization if the id was valid', (done) => {
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: '1' })

      jest.spyOn(organizationService, 'get').mockImplementation(() => of(mockOrganization1))

      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result.error).toBeNull()
          expect(result.organization.id).toEqual(1)
          done()
        })

      jest.advanceTimersByTime(1000)
      userProfileSubject$.next(mockUserProfile3)
    })

    it('should return to the organization page if the id was invalid', (done) => {
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: '1' })

      jest.spyOn(organizationService, 'get').mockImplementation(() => throwError('Error'))

      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .catch((error) => {
          expect(router.navigate).toHaveBeenCalledWith(['organizations'])
          done()
        })

      jest.advanceTimersByTime(1000)
      userProfileSubject$.next(mockUserProfile3)
    })
  })

  describe('When the resolve method is called and the user does not have the role SuperAdmin', () => {
    it('should redirect to the editor with the users organization if the the id was different from the users organizatin id', (done) => {
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: '2' })

      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .catch((error) => {
          expect(router.navigate).toHaveBeenCalledWith([
            'organizations',
            mockOrganization1.id,
            'editor',
          ])
          done()
        })

      jest.advanceTimersByTime(1000)
      userProfileSubject$.next(mockUserProfile1)
    })

    it('should return with the organization if the id was the users organization id', (done) => {
      jest.spyOn(organizationService, 'get').mockImplementation(() => of(mockOrganization1))
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: '1' })

      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .then((result) => {
          expect(result.error).toBeNull()
          expect(result.organization.id).toEqual(1)
          done()
        })

      jest.advanceTimersByTime(1000)
      userProfileSubject$.next(mockUserProfile1)
    })
  })

  describe('When the user profile could not be loaded after 10s', () => {
    it('should redirect to the organizations page', (done) => {
      jest.useFakeTimers()
      const paramMap = convertToParamMap({ id: '1' })

      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      resolver
        .resolve(activatedRoute, state)
        .toPromise()
        .catch((error) => {
          expect(router.navigate).toHaveBeenCalledWith(['organizations'])
          done()
        })

      jest.advanceTimersByTime(11000)
      userProfileSubject$.next()
    })
  })
})
