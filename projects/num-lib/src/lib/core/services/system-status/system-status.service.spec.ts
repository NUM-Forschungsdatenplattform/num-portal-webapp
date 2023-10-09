import { TestBed } from '@angular/core/testing'

import { SystemStatusService } from './system-status.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppConfigService } from 'projects/num-lib/src/lib/config/app-config.service'
import { HttpClient } from '@angular/common/http'

describe('SystemStatusService', () => {
  let service: SystemStatusService

  const appConfig = {
    config: { api: { baseUrl: 'foo.bar' } },
  } as unknown as AppConfigService

  const httpService = {
    get: {
      EHRBASE: 'string',
      FE: 'string',
      FHIR_BRIDGE: 'string',
      KEYCLOAK: 'string',
      NUM: 'string',
    },
  } as unknown as HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AppConfigService,
          useValue: appConfig,
        },
        {
          provide: HttpClient,
          useValue: httpService,
        },
      ],
    })
    service = TestBed.inject(SystemStatusService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  it('should check system status', () => {
    service.getSystemStatusOberservable()
  })
  it('should check for errors', () => {
    service.hasError({
      EHRBASE: '',
      KEYCLOAK: '',
      NUM: '',
      CHECK_FOR_ANNOUNCEMENTS: '',
      FE: '',
      FHIR_BRIDGE: '',
    })
  })
})
