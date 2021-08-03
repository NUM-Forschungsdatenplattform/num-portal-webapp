import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'

import { ManagerService } from './manager.service'

describe('ManagerService', () => {
  let service: ManagerService

  const httpClient = {
    get: jest.fn(),
  } as unknown as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new ManagerService(httpClient, appConfig)
    jest.spyOn(service, 'handleError')
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When the pseodonym is supposed to be resolved', () => {
    const projectId = 1
    const pseudonym = 'abc123'
    const resolvedValue = '123abc'

    it('should call the api with the projectId and pseudonym', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(resolvedValue))
      const result = await service.resolvePseudonym(projectId, pseudonym).toPromise()
      expect(httpClient.get).toHaveBeenCalledWith(
        `${appConfig.config.api.baseUrl}/project/${projectId}/resolve/${pseudonym}`,
        { responseType: 'text' }
      )
      expect(result).toEqual(resolvedValue)
    })

    it('should call the api and handle errors', async (done) => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))

      try {
        await service.resolvePseudonym(projectId, pseudonym).toPromise()
      } catch (error) {
        expect(httpClient.get).toHaveBeenCalledWith(
          `${appConfig.config.api.baseUrl}/project/${projectId}/resolve/${pseudonym}`,
          { responseType: 'text' }
        )
        expect(service.handleError).toHaveBeenCalled()
        done()
      }
    })
  })
})
