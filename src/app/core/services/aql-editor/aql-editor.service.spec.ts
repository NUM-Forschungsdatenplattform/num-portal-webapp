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
import { IAqlValidationResponse } from 'src/app/shared/models/archetype-query-builder/aql-validation-response.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { mockAqbTemplates } from 'src/mocks/data-mocks/aqb/aqb-templates.mock'
import { mockComplexContains } from 'src/mocks/data-mocks/aqb/complex-contains.mock'
import { mockCoronaAnamnese } from 'src/mocks/data-mocks/aqb/corona-anamnese.mock'
import { AqlEditorService } from './aql-editor.service'

describe('AqlEditorService', () => {
  let service: AqlEditorService
  const baseUrl = 'localhost/aqleditor/v1'

  const httpClient = {
    get: () => jest.fn(),
    post: () => jest.fn(),
  } as unknown as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new AqlEditorService(httpClient, appConfig)
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getTemplates method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqbTemplates))
      service.getTemplates().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/template`)
    })

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.getTemplates().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/template`)
      expect(service.handleError).toHaveBeenCalled()
    })

    it('should expose the templates on the templates observable', (done) => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqbTemplates))

      service.getTemplates().subscribe()

      service.templatesObservable$.subscribe((templates) => {
        expect(templates).toEqual(mockAqbTemplates)
        expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/template`)
        done()
      })
    })
  })

  describe('When the content of a template is supposed to be fetched by getContainment method', () => {
    it('should call the api, if no cachedContainment is found', () => {
      const id = 'test1'
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockCoronaAnamnese))
      service.getContainment(id).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/containment/${id}`)
    })

    it('should not call the api, if a cachedContainment is found', () => {
      const id = 'test1'
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockCoronaAnamnese))

      // Cache prefill:
      service.getContainment(id).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/containment/${id}`)
      expect(httpClient.get).toHaveBeenCalledTimes(1)

      // Actual assertion:
      service.getContainment(id).subscribe()
      expect(httpClient.get).toHaveBeenCalledTimes(1)
    })
  })

  describe('When a query is supposed to be build by the aql-editor backend', () => {
    it('should post the aqb model to the api and return formatted', (done) => {
      const buildResponse: IArchetypeQueryBuilderResponse = {
        q: 'result string',
        parameters: {},
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(buildResponse))
      jest.spyOn(service.formatter, 'formatQuery')
      service.buildAql(mockComplexContains).subscribe((result) => {
        expect(result).toEqual(buildResponse)
        done()
      })
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/aql`, mockComplexContains)
      expect(service.formatter.formatQuery).toHaveBeenCalledWith(buildResponse.q)
    })

    it('should handle the error', (done) => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('error'))

      service.buildAql(mockComplexContains).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined()
          done()
        },
      )
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/aql`, mockComplexContains)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a query is supposed to be validated', () => {
    const query = 'test test test'

    it('should call the api to return the validation result on success', (done) => {
      const validationResponse: IAqlValidationResponse = {
        error: 'Error string',
        message: 'Error message',
        startColumn: 10,
        startLine: 2,
        valid: false,
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(validationResponse))
      service.validateAql(query).subscribe((response) => {
        expect(response).toEqual(validationResponse)
        done()
      })
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/aql/validate`, { q: query })
    })

    it('should call the api and handle the error', (done) => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('error'))
      jest.spyOn(service, 'handleError')

      service.validateAql(query).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined()
          done()
        },
      )
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/aql/validate`, { q: query })
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
