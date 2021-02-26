import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from './app-config.service'

describe('AppConfigService', () => {
  let appConfigService: AppConfigService
  const config = { config: 'test' }
  const httpClient = ({
    get: () => of(config),
  } as unknown) as HttpClient

  beforeEach(() => {
    appConfigService = new AppConfigService(httpClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(appConfigService).toBeTruthy()
  })

  describe('When loadConfig is triggered', () => {
    it('loads the config into the config object on success', async () => {
      jest.spyOn(httpClient, 'get')
      await appConfigService.loadConfig()
      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(appConfigService.config).toEqual(config)
    })

    it('rejects with an error on error', async () => {
      jest.spyOn(httpClient, 'get').mockReturnValue(throwError(new Error('Error')))
      appConfigService
        .loadConfig()
        .catch((error) => {
          expect(error).toBeDefined()
        })
        .then((result) => {
          expect(result).toBeUndefined()
        })
    })
  })
})
