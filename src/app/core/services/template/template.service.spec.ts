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

import { TemplateService } from './template.service'
import { of, throwError, timer } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { mockTemplates } from '../../../../mocks/data-mocks/templates.mock'
import { AppConfigService } from '../../../config/app-config.service'
import { skipUntil } from 'rxjs/operators'
import { ITemplateFilter } from 'src/app/shared/models/template/template-filter.interface'
import { ITemplateMetaDataApi } from 'src/app/shared/models/template/template-api.interface'

describe('TemplateService', () => {
  let service: TemplateService
  let throttleTime: number
  const baseUrl = 'localhost/api/template/metadata'

  const httpClient = ({
    get: jest.fn(),
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
    service = new TemplateService(httpClient, appConfig)
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
      service
        .getAll()
        .toPromise()
        .catch(() => {})
      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When the filter logic fails to retrieve data', () => {
    it('should result in an empty array', (done) => {
      const anyService = service as any

      anyService.templates = []
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('error'))

      service.filteredTemplatesObservable$
        .pipe(skipUntil(timer(anyService.throttleTime / 2)))
        .subscribe((result) => {
          expect(result).toEqual([])
          done()
        })

      setTimeout(() => {
        service.setFilter({
          searchText: 'test',
        })
      }, anyService.throttleTime + 1)
    })
  })

  describe('When multiple filter are passed in', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockTemplates))
      throttleTime = (service as any).throttleTime
    })

    it('should debounce the filtering', async (done) => {
      const filterConfig: ITemplateFilter = {
        searchText: 'test1',
      }
      const filterConfigLast: ITemplateFilter = {
        searchText: 'Template Mock 1',
      }
      let filterResult: ITemplateMetaDataApi[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredTemplatesObservable$.subscribe((result) => callHelper(result))

      /* Service Init */
      expect(callHelper).toHaveBeenCalledTimes(1)

      /* First filter call after throttle time */
      setTimeout(() => {
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(2)
      }, throttleTime + 1)

      setTimeout(() => {
        /* Second filter call but within throttle time */
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(2)
      }, throttleTime + 1)

      setTimeout(() => {
        /* Third filter call but within throttle time */
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(2)
      }, throttleTime + 10)

      setTimeout(() => {
        /* Fourth filter call, meanwhile the third filter was pushed */
        service.setFilter(filterConfigLast)
        expect(callHelper).toHaveBeenCalledTimes(4)
        expect(filterResult.length).toEqual(1)
        expect(filterResult[0].templateId).toEqual('1')
        done()
      }, throttleTime * 3)
    })
  })
})
