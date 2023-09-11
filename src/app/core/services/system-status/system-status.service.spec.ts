import { TestBed } from '@angular/core/testing'

import { SystemStatusService } from './system-status.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppConfigService } from 'src/app/config/app-config.service'

describe('SystemStatusService', () => {
  let service: SystemStatusService

  const appConfig = {
    config: { api: { baseUrl: 'foo.bar' } },
  } as unknown as AppConfigService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AppConfigService,
          useValue: appConfig,
        },
      ],
    })
    service = TestBed.inject(SystemStatusService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
