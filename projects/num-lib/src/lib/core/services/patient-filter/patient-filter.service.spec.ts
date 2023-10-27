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
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { take } from 'rxjs/operators'
import { AppConfigService } from '../../../../config/app-config.service'
import { mockAql1, mockAql2 } from 'src/mocks/data-mocks/aqls.mock'
import { mockCohortPreviewData } from 'src/mocks/data-mocks/cohort-graph.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockResultFlatList } from 'src/mocks/data-mocks/result-set-mock'

import { PatientFilterService } from './patient-filter.service'
import { ConnectorNodeType } from '../../../shared/models/connector-node-type.enum'
import { ICohortApi } from '../../../shared/models/project/cohort-api.interface'
import { ICohortGroupApi } from '../../../shared/models/project/cohort-group-api.interface'
import { ProjectUiModel } from '../../../shared/models/project/project-ui.model'

describe('PatientFilterService', () => {
  let service: PatientFilterService
  const baseAqlUrl = 'localhost/api/aql'
  const baseProjectUrl = 'localhost/api/project'
  const patientQueryBody = {
    query: 'SELECT e/ehr_id/value as ehrId FROM EHR e WHERE EXISTS e/ehr_id/value',
  }

  const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  } as unknown as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(httpClient, 'post').mockImplementation(() => of())
    service = new PatientFilterService(appConfig, httpClient)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAllDatasetCount method comes in', () => {
    it('should call the api - with success', (done) => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(200))
      service.getAllDatasetCount().subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseAqlUrl}/size`, patientQueryBody)
      service.totalDatasetCountObservable$.subscribe((datasetsCount) => {
        expect(datasetsCount).toEqual(200)
        done()
      })
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .getAllDatasetCount()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`${baseAqlUrl}/size`, patientQueryBody)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getPreviewData method comes in', () => {
    const cohortGroup: ICohortGroupApi = {
      type: ConnectorNodeType.Group,
      children: [
        {
          type: ConnectorNodeType.Aql,
          query: mockAql1,
        },
      ],
    }
    // it('should call the api - with success', (done) => {
    //   jest.spyOn(httpClient, 'post').mockImplementation(() => of('result'))
    //   service.getPreviewData(cohortGroup, false).subscribe()
    //   expect(httpClient.post).toHaveBeenCalledWith(
    //     'localhost/api/cohort/size/distribution?allowUsageOutsideEu=false',

    //     cohortGroup
    //   )
    //   service.previewDataObservable$.subscribe((data) => {
    //     expect(data).toEqual('result')
    //     done()
    //   })
    // })

    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .getPreviewData(cohortGroup)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/cohort/size/distribution?allowUsageOutsideEu=true',
        cohortGroup
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getProjectData comes in', () => {
    const templates = ['Test 1', 'Test 2']

    it('should call the backend - with success', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockResultFlatList))
      service.getProjectData(mockCohort1, templates).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith('localhost/api/project/manager/execute', {
        cohort: mockCohort1,
        templates,
      })
    })

    it('should call the backend - with error', () => {
      jest
        .spyOn(httpClient, 'post')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 400 })))
      jest.spyOn(service, 'handleError')
      service
        .getProjectData(mockCohort1, templates)
        .toPromise()
        .then(() => {})
        .catch(() => {})
      expect(httpClient.post).toHaveBeenCalledWith('localhost/api/project/manager/execute', {
        cohort: mockCohort1,
        templates,
      })
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When the current project is supposed to be provided', () => {
    it('should provide the current project if its there', (done) => {
      const project = new ProjectUiModel()
      project.id = 123
      service.setCurrentProject(project)
      service.getCurrentProject().subscribe((providedProject) => {
        expect(providedProject.id).toEqual(project.id)
        done()
      })
    })

    it('should throw if there is no current project', (done) => {
      const project = new ProjectUiModel()
      service.setCurrentProject(project)
      service.resetCurrentProject()
      service.getCurrentProject().subscribe(
        (_) => {},
        (error) => {
          expect(error).toBeDefined()
          done()
        }
      )
    })
  })

  describe('When call to resetPreviewData comes in', () => {
    const cohortGroup: ICohortGroupApi = {
      type: ConnectorNodeType.Group,
      children: [
        {
          type: ConnectorNodeType.Aql,
          query: mockAql1,
        },
      ],
    }
    beforeEach(async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockCohortPreviewData))
      await service.getPreviewData(cohortGroup, false).toPromise()
    })

    it('should clear the data for preview of a project', async () => {
      const before = await service.previewDataObservable$.pipe(take(1)).toPromise()
      expect(before).toEqual(mockCohortPreviewData)
      service.resetPreviewData()
      const after = await service.previewDataObservable$.pipe(take(1)).toPromise()
      expect(after).toEqual({ ages: {}, count: 0, hospitals: {} })
    })
  })

  describe('When the export of data has been called', () => {
    const cohort: ICohortApi = {
      id: null,
      cohortGroup: {
        type: ConnectorNodeType.Group,
        children: [
          {
            type: ConnectorNodeType.Aql,
            query: mockAql2,
          },
        ],
      },
      name: 'Preview Cohort',
      projectId: null,
      description: '',
    }
    const templates = ['Test Template 1', 'Test Template 2']

    // it('should call the API to get a JSON download', async () => {
    //   jest.spyOn(httpClient, 'post').mockImplementation(() => of('Result JSON'))
    //   await service.exportFile(cohort, templates, 'json').toPromise()
    //   expect(httpClient.post).toHaveBeenCalledWith(
    //     `${baseProjectUrl}/manager/export?format=json`,
    //     { cohort, templates },
    //     { responseType: 'text' }
    //   )
    // })

    it('should call the API to get a CSV download', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of('Result CSV 1 Zip'))
      await service.exportFile(cohort, templates, 'csv').toPromise()
      expect(httpClient.post).toHaveBeenCalledWith(
        `${baseProjectUrl}/manager/export?format=csv`,
        { cohort, templates },
        { responseType: 'blob' as 'json' }
      )
    })

    it('should call the API to get a CSV download of the format is missing', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of('Result CSV 2 Zip'))
      await service.exportFile(cohort, templates).toPromise()
      expect(httpClient.post).toHaveBeenCalledWith(
        `${baseProjectUrl}/manager/export?format=csv`,
        { cohort, templates },
        { responseType: 'blob' as 'json' }
      )
    })

    it('should handle an error from API', async () => {
      jest.spyOn(service, 'handleError')
      jest
        .spyOn(httpClient, 'post')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 404 })))

      try {
        await service.exportFile(cohort, templates).toPromise()
      } catch (_err) {
        //
      } finally {
        expect(service.handleError).toHaveBeenCalledTimes(1)
      }
    })
  })
})
