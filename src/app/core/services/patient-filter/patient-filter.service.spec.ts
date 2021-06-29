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

import { PatientFilterService } from './patient-filter.service'

describe('PatientFilterService', () => {
  let service: PatientFilterService
  const baseUrl = 'localhost/api/aql'
  const body = {
    query: 'SELECT e/ehr_id/value as ehrId FROM EHR e WHERE EXISTS e/ehr_id/value',
  }

  const httpClient = ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(httpClient, 'post').mockImplementation(() => of())
    service = new PatientFilterService(appConfig, httpClient)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAllDatasetCount method comes in', () => {
    it('should call the api - with success', (done) => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(200))
      service.getAllDatasetCount().subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, body)
      service.totalDatasetCountObservable$.subscribe((datasetsCount) => {
        expect(datasetsCount).toEqual(200)
        done()
      })
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .getAllDatasetCount()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, body)
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
