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
import { AqlCategoryService } from './aql-category.service'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockAqlCategories, mockAqlCategory1 } from 'src/mocks/data-mocks/aql-categories.mock'

describe('AqlCategoryService', () => {
  let service: AqlCategoryService
  const baseUrl = 'localhost/api/aql/category'

  const httpClient = {
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  } as unknown as HttpClient

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
    service = new AqlCategoryService(appConfig, httpClient)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAllPag method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqlCategories))
      service.getAllPag(0, 2, 'ASC', 'name').subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })
    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .getAllPag(0, 2, 'ASC', 'name')
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        'localhost/api/aql/category/all?page=0&size=2&sort=ASC&sortBy=name'
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
    })

    it('should call the api - with error', () => {
      service
        .getAll()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})

      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqlCategories))
    })

    it('should call the api - with success', () => {
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
    })
  })

  describe('When a call to get method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqlCategories))
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
          expect(error).toEqual(new Error('AQL category with id 123 not found'))
        })
    })
  })

  describe('When a call to save method comes in', () => {
    it('should post to the api with the aqls as payload', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockAqlCategory1))
      service.save(mockAqlCategory1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockAqlCategory1)
    })

    it('should call handleError on api error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.save(mockAqlCategory1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(baseUrl, mockAqlCategory1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to delete method comes in', () => {
    it('should call to the delete to the api with the specific aql id', () => {
      const aqlCategoryId = 1
      jest.spyOn(httpClient, 'delete').mockImplementation(() => of(aqlCategoryId))
      service.delete(aqlCategoryId).subscribe()
      expect(httpClient.delete).toHaveBeenCalledWith(`${baseUrl}/${aqlCategoryId}`)
    })

    it('should call handleError on api error', () => {
      const aqlCategoryId = 1
      jest.spyOn(httpClient, 'delete').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.delete(aqlCategoryId).subscribe()
      expect(httpClient.delete).toHaveBeenCalledWith(`${baseUrl}/${aqlCategoryId}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it('should call the put with the aqls and Id as payload', () => {
      const aqlCategoryId = 1
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockAqlCategory1))
      service.update(mockAqlCategory1, aqlCategoryId).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(`${baseUrl}/${aqlCategoryId}`, mockAqlCategory1)
    })

    it('should call handleError on api error', () => {
      const aqlCategoryId = 1
      jest.spyOn(httpClient, 'put').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.update(mockAqlCategory1, aqlCategoryId).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(`${baseUrl}/${aqlCategoryId}`, mockAqlCategory1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
