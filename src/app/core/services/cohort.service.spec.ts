import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'

import { CohortService } from './cohort.service'

describe('CohortService', () => {
  let service: CohortService

  const httpClient = ({
    get: () => of(),
    post: () => of(),
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
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When executing a cohort definition', () => {
    const cohortId = 123
    const cohortSize = 321

    it('should call the api with the cohort id provided and return the response', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(cohortSize))
      const request = {
        url: `${appConfig.config.api.baseUrl}/cohort/${cohortId}/size`,
        body: {},
      }

      const result = await service.getCohortSize(cohortId).toPromise()

      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
      expect(result).toEqual(cohortSize)
    })

    it('should call the api and handle erros', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')

      service.getCohortSize(cohortId).subscribe()

      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
