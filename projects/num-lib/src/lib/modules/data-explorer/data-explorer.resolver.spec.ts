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
import { AuthService } from 'src/app/core/auth/auth.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { mockProject2, mockProject3 } from 'src/mocks/data-mocks/project.mock'
import { DataExplorerResolver } from './data-explorer.resolver'

describe('Data Explorer Resolver', () => {
  let resolver: DataExplorerResolver
  const state = {} as RouterStateSnapshot

  const projectService = {
    get: jest.fn(),
  } as unknown as ProjectService

  const router = {
    navigate: jest.fn(),
  } as unknown as Router

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  beforeEach(() => {
    resolver = new DataExplorerResolver(projectService, router, authService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should provide an error message and navigate back to overview when the id was not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      await resolver.resolve(activatedRoute, state).toPromise()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects'])
    })

    it('should return the correct project if the id is found, the project is published and the user is assigned as a reseracher', async () => {
      projectService.get = jest.fn().mockImplementation(() => of(mockProject3))
      const mockUser = { sub: 'abc-1' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 3 })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.project.id).toEqual(3)
    })

    it('should provide an error message and navigate back to overview if the id is found and the project is not published', async () => {
      projectService.get = jest.fn().mockImplementation(() => of(mockProject2))
      const mockUser = { sub: 'abc-1' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 2 })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      await resolver.resolve(activatedRoute, state).toPromise()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects'])
    })

    it('should provide an error message and navigate back to overview if the id is found and the user is not assigned as a reseracher', async () => {
      projectService.get = jest.fn().mockImplementation(() => of(mockProject3))
      const mockUser = { sub: 'abc-15' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 3 })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      await resolver.resolve(activatedRoute, state).toPromise()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects'])
    })

    it('should return an error message and navigate back to overview if the id is not found', async () => {
      projectService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = {
        paramMap,
      } as unknown as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result).toBe('Error')
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects'])
    })
  })
})
