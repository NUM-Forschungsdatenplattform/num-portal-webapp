import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'

import { StudyService } from './study.service'

describe('StudyService', () => {
  let service: StudyService
  const baseUrl = 'localhost/api/study'

  const httpClient = ({
    get: () => of(),
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
    service = new StudyService(httpClient, appConfig)
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
