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
import { of, throwError, timer } from 'rxjs'
import { skipUntil } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { mockPhenotype1, mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'
import { PhenotypeService } from './phenotype.service'

describe('PhenotypeService', () => {
  let service: PhenotypeService
  let throttleTime: number
  const baseUrl = 'localhost/api/phenotype'

  const httpClient = ({
    get: jest.fn(),
    post: jest.fn(),
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
    jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockPhenotypes))
    service = new PhenotypeService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it('should call the api - with success', () => {
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

  describe('When a call to get method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockPhenotype1))
      service.get(1).subscribe((result) => {
        expect(result).toEqual(mockPhenotype1)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/phenotype/${1}`)
    })

    it('should call the api - with error', () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .get(1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/phenotype/${1}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to create method comes in', () => {
    it('should post to the api with the phenotype as payload', () => {
      jest.spyOn(httpClient, 'post')
      service.create(mockPhenotype1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockPhenotype1)
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .create(mockPhenotype1)
        .toPromise()
        .catch(() => {})
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockPhenotype1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getSize method comes in', () => {
    it('should post to the api with the phenotype as payload', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(123))
      service.getSize(mockPhenotype1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, mockPhenotype1)
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .getSize(mockPhenotype1)
        .toPromise()
        .catch(() => {})
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/size`, mockPhenotype1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When the filter logic fails to retrieve data', () => {
    it('should result in an empty array', (done) => {
      const anyService = service as any

      anyService.phenotypes = []
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('error'))

      service.filteredPhenotypesObservable$
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
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockPhenotypes))
      throttleTime = (service as any).throttleTime
    })

    it('should debounce the filtering', async (done) => {
      const filterConfig: IPhenotypeFilter = {
        searchText: 'test1',
      }
      const filterConfigLast: IPhenotypeFilter = {
        searchText: 'Blood pressure1',
      }
      let filterResult: IPhenotypeApi[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredPhenotypesObservable$.subscribe((result) => callHelper(result))

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
})
