import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockPhenotype1, mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'

import { PhenotypeService } from './phenotype.service'

describe('PhenotypeService', () => {
  let service: PhenotypeService
  const baseUrl = 'localhost/api/phenotype'

  const httpClient = ({
    get: () => of(mockPhenotypes),
    post: () => of({}),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new PhenotypeService(httpClient, appConfig)
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockPhenotypes))
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to get method comes in', () => {
    it('should return with a single phenotype found on the backend', async () => {
      const result = await service.get(1).toPromise()
      expect(result.id).toEqual(1)
    })

    it('should return with a single phenotype found in memory', async () => {
      const preFillMemory = await service.getAll().toPromise()
      const result = await service.get(1).toPromise()
      expect(result.id).toEqual(1)
    })

    it('should return with an not found error when not found', async () => {
      const result = await service
        .get(123)
        .toPromise()
        .catch((error) => {
          expect(error).toBeTruthy()
          expect(error).toEqual(new Error('Not Found'))
        })
    })
  })

  describe('When a call to create method comes in', () => {
    it('should post to the api with the phenotype as payload', () => {
      jest.spyOn(httpClient, 'post')
      service.create(mockPhenotype1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockPhenotype1)
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.create(mockPhenotype1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockPhenotype1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
