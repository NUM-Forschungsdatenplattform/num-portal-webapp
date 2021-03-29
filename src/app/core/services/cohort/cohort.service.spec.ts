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

import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { ICohortApi } from 'src/app/shared/models/project/cohort-api.interface'
import { ICohortGroupApi } from 'src/app/shared/models/project/cohort-group-api.interface'

import { CohortService } from './cohort.service'

describe('CohortService', () => {
  let service: CohortService

  const mockCohortGroup: ICohortGroupApi = {
    id: null,
    operator: LogicalOperator.And,
    type: ConnectorNodeType.Group,
    children: [new PhenotypeUiModel()],
  }

  const mockCohort: ICohortApi = {
    id: null,
    name: 'Test Name',
    studyId: 1, // Should change to projectId once the BE is refactored
    description: 'Test Description',
    cohortGroup: undefined,
  }

  const httpClient = ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new CohortService(httpClient, appConfig)
    jest.spyOn(service, 'handleError')
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When executing a cohort definition', () => {
    const cohortSize = 321

    it('should call the api with the cohort id provided and return the response', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(cohortSize))
      const request = {
        url: `${appConfig.config.api.baseUrl}/cohort/size`,
        body: mockCohortGroup,
      }

      const result = await service.getSize(mockCohortGroup).toPromise()

      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
      expect(result).toEqual(cohortSize)
    })

    it('should call the api and handle erros', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))

      service.getSize(mockCohortGroup).subscribe()

      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a cohort is supposed to be fetched', () => {
    it('should call the api with the cohort id', () => {
      const cohortId = 2
      jest.spyOn(httpClient, 'get').mockImplementation(() => of())
      service.get(cohortId).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(
        `${appConfig.config.api.baseUrl}/cohort/${cohortId}`
      )
    })
  })

  describe('When a cohort is supposed to be created', () => {
    it('should call the api to post the cohort', () => {
      const request = {
        url: `${appConfig.config.api.baseUrl}/cohort`,
        body: mockCohort,
      }

      jest.spyOn(httpClient, 'post').mockImplementation(() => of())

      service.create(mockCohort).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
    })
  })

  describe('When a cohort is supposed to be updated', () => {
    const id = 1
    const request = {
      url: `${appConfig.config.api.baseUrl}/cohort/${id}`,
      body: mockCohort,
    }
    it('should call the api to update the cohort', () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of())
      service.update(mockCohort, id).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should call the api and handle errors if they occur', () => {
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Not today'))
      service.update(mockCohort, id).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(request.url, request.body)
      expect(service.handleError).toHaveBeenCalledTimes(1)
    })
  })
})
