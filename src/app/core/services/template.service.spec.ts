import { TemplateService } from './template.service'
import { of, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { mockTemplates } from '../../../mocks/data-mocks/templates.mock'
import { AppConfigService } from '../../config/app-config.service'

describe('TemplateService', () => {
  let service: TemplateService
  const baseUrl = 'localhost/api/template/metadata'

  const httpClient = ({
    get: () => of(mockTemplates),
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
    service = new TemplateService(httpClient, appConfig)
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockTemplates))
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
})
