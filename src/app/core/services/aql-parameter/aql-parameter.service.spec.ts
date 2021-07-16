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
import { HttpClient, HttpParams } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AqlParameterService } from './aql-parameter.service'

describe('AqlCategoryService', () => {
  let service: AqlParameterService
  const baseUrl = 'localhost/api/aql/parameter'

  const httpClient = ({
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
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

    jest.spyOn(httpClient, 'get').mockImplementation(() => of())
    service = new AqlParameterService(appConfig, httpClient)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When the parameter values are supposed to be delivered', () => {
    const archetypeId = 'testId'
    const aqlPath = 'testPath'
    const params = new HttpParams({ fromObject: { archetypeId, aqlPath } })

    it('should call the api with the archetypeId and aqlPath if its not already cached', () => {
      service.getValues(aqlPath, archetypeId)
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/values`, { params })
    })

    it('should not call the api if its already cached', () => {
      service.getValues(aqlPath, archetypeId)

      jest.clearAllMocks()

      service.getValues(aqlPath, archetypeId)
      expect(httpClient.get).not.toHaveBeenCalled()
    })

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .getValues(aqlPath, archetypeId)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/values`, { params })
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
