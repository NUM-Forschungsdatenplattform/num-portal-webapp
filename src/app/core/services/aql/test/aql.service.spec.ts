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
import { of, Subject, throwError, timer } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { mockAql1, mockAqls, mockAqlsToFilter } from 'src/mocks/data-mocks/aqls.mock'
import { AqlService } from '../aql.service'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { ProfileService } from '../../profile/profile.service'
import { skipUntil } from 'rxjs/operators'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { aqlFilterTestcases } from './aql-filter-testcases'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'

describe('AqlService', () => {
  let service: AqlService
  const baseUrl = 'localhost/api/aql'
  const userProfileSubject$ = new Subject<any>()

  let throttleTime: number
  const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
  } as unknown as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const userProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const filterConfig: IAqlFilter = {
    filterItem: [],
    searchText: 'test',
  }

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(httpClient, 'get').mockImplementation(() => of())
    service = new AqlService(httpClient, appConfig, userProfileService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set the user to the service', () => {
    userProfileSubject$.next(mockUserProfile1)
    expect(service.user).toEqual(mockUserProfile1)
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.getAllObservable$ = undefined
      const date = new Date()
      date.setMinutes(date.getMinutes() - 1)
      service.getAllTimeStamp = date
    })

    it('should call the api - with error', async () => {
      try {
        await service.getAll().toPromise()
      } catch (err) {
      } finally {
        expect(httpClient.get).toHaveBeenCalledWith('localhost/api/aql')
        expect(service.handleError).toHaveBeenCalled()
      }
    })
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqls))
    })
    it('should call the api - with success', () => {
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })

    it('should cache get all requests', async () => {
      await service.getAll().toPromise()
      await service.getAll().toPromise()
      expect(httpClient.get).toHaveBeenCalledTimes(1)
    })
  })

  describe('When a call to get method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqls))
      service.cacheTime = 0
      service.getAllObservable$ = undefined
    })
    it('should return with a single aql found on the backend', async () => {
      const result = await service.get(1).toPromise()
      expect(result.id).toEqual(1)
    })

    it('should return with a single aql found in memory', async () => {
      await service.getAll().toPromise()
      const result = await service.get(1).toPromise()
      expect(result.id).toEqual(1)
    })

    it('should return with an not found error when not found', async () => {
      await service
        .get(123)
        .toPromise()
        .catch((error) => {
          expect(error).toBeTruthy()
          expect(error).toEqual(new Error('Not Found'))
        })
    })
  })

  describe('When multiple filter are passed in', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqls))
      throttleTime = (service as any).throttleTime
      service.cacheTime = 0
      service.getAllObservable$ = undefined
    })

    it('should debounce the filtering', async (done) => {
      const filterConfigLast: IAqlFilter = {
        filterItem: [],
        searchText: 'name1',
      }
      let filterResult: AqlEditorUiModel[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredAqlsObservable$.subscribe(callHelper)

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
        expect(filterResult[0].id).toEqual(1)
        done()
      }, throttleTime * 3)
    })
  })

  describe('When the filter logic fails to retrieve data', () => {
    beforeEach(() => {
      service.cacheTime = 0
      service.getAllObservable$ = undefined
    })

    it('should result in an empty array', (done) => {
      const anyService = service as any

      anyService.aqls = []
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('error'))

      service.filteredAqlsObservable$
        .pipe(skipUntil(timer(anyService.throttleTime / 2)))
        .subscribe((result) => {
          expect(result).toEqual([])
          done()
        })

      setTimeout(() => {
        service.setFilter(filterConfig)
      }, anyService.throttleTime + 1)
    })
  })

  describe('When passing in filters', () => {
    test.each(aqlFilterTestcases)('It should filter as expected', (testcase) => {
      const anyService = service as any
      anyService.user = { id: '1', organization: { id: 1 } }

      const result = service.filterItems(mockAqlsToFilter as IAqlApi[], testcase.filter)
      expect(result.length).toEqual(testcase.resultLength)
    })
  })

  describe('When a call to save method comes in', () => {
    it('should post to the api with the aqls as payload', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockAql1))
      service.save(mockAql1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockAql1)
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.save(mockAql1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockAql1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to delete method comes in', () => {
    it('should call to the delete to the api with the specific aql id', () => {
      const aqlId = 1
      jest.spyOn(httpClient, 'delete').mockImplementation(() => of(aqlId))
      service.delete(aqlId).subscribe()
      expect(httpClient.delete).toHaveBeenCalledWith(`${baseUrl}/${aqlId}`)
    })

    it('should call handleError on api error', () => {
      const aqlId = 1
      jest.spyOn(httpClient, 'delete').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.delete(aqlId).subscribe()
      expect(httpClient.delete).toHaveBeenCalledWith(`${baseUrl}/${aqlId}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it('should call the put with the aqls and Id as payload', () => {
      const aqlId = 1
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockAql1))
      service.update(mockAql1, aqlId).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(`${baseUrl}/${aqlId}`, mockAql1)
    })

    it('should call handleError on api error', () => {
      const aqlId = 1
      jest.spyOn(httpClient, 'put').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.update(mockAql1, aqlId).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(`${baseUrl}/${aqlId}`, mockAql1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to execute method comes in', () => {
    it('should call the API with post and the id in the url', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of({}))
      service.getSize('query').subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, {
        query: 'query',
      })
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.getSize('query').subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, {
        query: 'query',
      })
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
