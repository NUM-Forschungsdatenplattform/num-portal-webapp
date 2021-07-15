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

import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { DataFilterResolver } from './data-filter.resolver'

describe('AqlsResolver', () => {
  let resolver: DataFilterResolver

  const patientFilterService = ({
    getCurrentProject: jest.fn(),
  } as unknown) as PatientFilterService

  const mockRouter = ({
    navigate: jest.fn(),
  } as unknown) as Router

  beforeEach(() => {
    jest.clearAllMocks()
    resolver = new DataFilterResolver(mockRouter, patientFilterService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  it('should resolve with the current project if its present', (done) => {
    jest
      .spyOn(patientFilterService, 'getCurrentProject')
      .mockImplementation(() => of(new ProjectUiModel()))
    resolver.resolve().subscribe((project) => {
      expect(project).toBeInstanceOf(ProjectUiModel)
      done()
    })
  })

  it('should redirect to the search page if there is no current projec', (done) => {
    jest
      .spyOn(patientFilterService, 'getCurrentProject')
      .mockImplementation(() => throwError('Nope'))

    resolver
      .resolve()
      .toPromise()
      .then((_) => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['search'])
        done()
      })
  })
})
