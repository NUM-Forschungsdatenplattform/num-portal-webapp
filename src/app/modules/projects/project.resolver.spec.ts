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
  Navigation,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, throwError } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { ProjectResolver } from './project.resolver'

describe('Project Resolver', () => {
  let resolver: ProjectResolver
  const state = {} as RouterStateSnapshot

  const projectService = ({
    get: jest.fn(),
  } as unknown) as ProjectService

  const mockRouter = ({
    navigate: jest.fn(),
    getCurrentNavigation: jest.fn(),
  } as unknown) as Router

  beforeEach(() => {
    resolver = new ProjectResolver(projectService, mockRouter)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should should return with an empty ProjectUiModel if the id was new and no project is in the route', async () => {
      jest.spyOn(mockRouter, 'getCurrentNavigation').mockImplementation(() => {
        return { extras: {} } as Navigation
      })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.project).toBeInstanceOf(ProjectUiModel)
      expect(result.project.id).toEqual(null)
    })

    it('should should return with the ProjectUiModel of the route if the id was new and its present', async () => {
      const projectUi = new ProjectUiModel()
      projectUi.templates = [{ templateId: 'template1', name: 'templateName1' }]
      const project = projectUi.convertToApiInterface()
      jest.spyOn(mockRouter, 'getCurrentNavigation').mockImplementation(() => {
        return ({ extras: { state: { project } } } as unknown) as Navigation
      })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.project).toBeInstanceOf(ProjectUiModel)
      expect(result.project.id).toEqual(null)
      expect(result.project.templates).toEqual(projectUi.templates)
    })

    it('should provide an error message when the id was not "new" and not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.project.id).toEqual(null)
    })

    it('should return the correct project if the id is found', async () => {
      projectService.get = jest.fn().mockImplementation(() => of(mockProject1))
      const paramMap = convertToParamMap({ id: 1 })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.project.id).toEqual(1)
    })

    it('should navigate back to the project overview if the project is not found', async () => {
      jest.spyOn(mockRouter, 'navigate').mockImplementation()
      projectService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      await resolver.resolve(activatedRoute, state).toPromise()
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/projects'])
    })

    it('should try to switch the status to in review if the mode is review', async () => {
      projectService.get = jest.fn().mockImplementation(() => of(mockProject1))
      projectService.updateStatusById = jest.fn().mockImplementation()
      const paramMap = convertToParamMap({ id: 1 })
      const queryParamMap = convertToParamMap({ mode: 'review' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot

      await resolver.resolve(activatedRoute, state).toPromise()
      expect(projectService.updateStatusById).toHaveBeenCalledWith(1, ProjectStatus.Reviewing)
    })
  })
})
