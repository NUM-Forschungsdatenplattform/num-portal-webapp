import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ICohortApi } from 'src/app/shared/models/project/cohort-api.interface'
import { ICohortGroupApi } from 'src/app/shared/models/project/cohort-group-api.interface'

import { CohortService } from './cohort.service'

describe('CohortService', () => {
  let service: CohortService

  const mockCohortGroup: ICohortGroupApi = {
    id: null,
    operator: LogicalOperator.And,
    type: ConnectorNodeType.Group,
    children: [],
  }

  const mockCohort: ICohortApi = {
    id: null,
    name: 'Test Name',
    projectId: 1,
    description: 'Test Description',
    cohortGroup: undefined,
  }

  const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  } as unknown as HttpClient

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

    test.each([true, false])(
      'should call the api with the cohort id provided and return the response',
      async (allowUsageOutsideEu) => {
        jest.spyOn(httpClient, 'post').mockImplementation(() => of(cohortSize))
        const request = {
          url: `${appConfig.config.api.baseUrl}/cohort/size?allowUsageOutsideEu=${allowUsageOutsideEu}`,
          body: mockCohortGroup,
        }

        const result = await service.getSize(mockCohortGroup, allowUsageOutsideEu).toPromise()

        expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
        expect(result).toEqual(cohortSize)
      }
    )

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

  describe('When a cohort is supposed to be executed within the context of templates', () => {
    it('should call the api with the cohortGroup and the templateIds', () => {
      const templateIds = ['template1', 'template2']
      const request = {
        url: `${appConfig.config.api.baseUrl}/cohort/size/template`,
        body: { cohortDto: { cohortGroup: mockCohortGroup }, templateIds },
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => of())
      service.getSizeForTemplates(mockCohortGroup, templateIds).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
    })
  })
})
