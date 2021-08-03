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
import { OrganizationService } from './organization.service'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

describe('OrganizationService', () => {
  let service: OrganizationService

  const httpClient = {
    get: () => of(mockOrganizations),
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
    jest.restoreAllMocks()
    service = new OrganizationService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganizations))
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })
    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .getAll()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/organization')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to get method comes in', () => {
    const mockOrganization = { id: 12345, name: 'Organization A' }
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganization))
      service.get(12345).subscribe((result) => {
        expect(result).toEqual(mockOrganization)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/organization/12345`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .get(12345)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/organization/12345`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When an organization is supposed to be created', () => {
    const request = {
      url: `${appConfig.config.api.baseUrl}/organization`,
      body: mockOrganization1,
    }
    it('should call the api to create the organization', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockOrganization1))
      jest.spyOn(httpClient, 'post').mockImplementation(() => of())

      await service.create(mockOrganization1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should call the api and handle errors if they occur', async () => {
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Sorry! Error!'))
      jest.spyOn(service, 'handleError')
      await service.create(mockOrganization1).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(request.url, request.body)
      expect(service.handleError).toHaveBeenCalledTimes(1)
    })
  })

  describe('When an organization is supposed to be updated', () => {
    const id = 1
    const request = {
      url: `${appConfig.config.api.baseUrl}/organization/${id}`,
      body: mockOrganization1,
    }
    it('should call the api to update the organization', async () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockOrganization1))
      await service.update(id, mockOrganization1).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should call the api and handle errors if they occur', async () => {
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Sorry! Error!'))
      jest.spyOn(service, 'handleError')
      service.update(id, mockOrganization1).subscribe()
      expect(httpClient.put).toHaveBeenCalledWith(request.url, request.body)
      expect(service.handleError).toHaveBeenCalledTimes(1)
    })
  })
})
