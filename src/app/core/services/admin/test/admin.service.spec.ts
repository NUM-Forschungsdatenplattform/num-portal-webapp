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
import { skipUntil } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockRoles, mockUser, mockUsers, mockUsersToFilter } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization1 } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { ProfileService } from '../../profile/profile.service'
import { AdminService } from '../admin.service'
import { adminFilterTestcases } from './admin-filter-testcases'

describe('AdminService', () => {
  let service: AdminService
  let throttleTime: number

  const filterConfig: IUserFilter = {
    searchText: 'test',
    filterItem: [],
  }

  const userProfileSubject$ = new Subject<any>()
  const userProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const httpClient = {
    get: jest.fn().mockImplementation(() => of(mockUsers)),
    post: jest.fn().mockImplementation(() => of()),
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
    service = new AdminService(httpClient, appConfig, userProfileService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getUnapprovedUsers method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUsers))
      service.getUnapprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/admin/user?approved=false&withRoles=true`
      )
      service.unapprovedUsersObservable$.subscribe((users) => {
        expect(users).toEqual(mockUsers)
      })
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .getUnapprovedUsers()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/admin/user?approved=false&withRoles=true`
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getApprovedUsers method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUsers))
      service.getApprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/admin/user?approved=true&withRoles=true`
      )
      service.approvedUsersObservable$.subscribe((users) => {
        expect(users).toEqual(mockUsers)
      })
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .getApprovedUsers()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/admin/user?approved=true&withRoles=true`
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to approveUser method comes in', () => {
    it(`should call the api - with success`, () => {
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }

      jest.spyOn(httpClient, 'post')
      service.approveUser(id).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/approve`,
        undefined,
        httpOptions
      )
    })
    it(`should call the api - with error`, () => {
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .approveUser(id)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/approve`,
        undefined,
        httpOptions
      )
    })
  })

  describe('When a call to getUserById method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => of(mockUser))
      service.getUserById(mockUser.id).subscribe((user) => {
        expect(user).toEqual(mockUser)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/${mockUser.id}`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .getUserById(mockUser.id)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/${mockUser.id}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getUserRoles method comes in', () => {
    it(`should call the api - with success`, () => {
      const id = '123-456'
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => of(mockRoles))
      service.getUserRoles(id).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/${id}/role`)
    })
    it(`should call the api - with error`, () => {
      const id = '123-456'
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .getUserRoles(id)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/${id}/role`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to addUserRoles method comes in', () => {
    it(`should call the api - with success`, () => {
      const roles = ['TEST_ROLE1', 'TEST_ROLE2']
      const id = '123-456'
      jest.spyOn(httpClient, 'post')
      service.addUserRoles(id, roles).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/admin/user/${id}/role`, roles)
    })
    it(`should call the api - with error`, () => {
      const roles = ['TEST_ROLE1', 'TEST_ROLE2']
      const id = '123-456'
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .addUserRoles(id, roles)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/admin/user/${id}/role`, roles)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to addUserOrganization method comes in', () => {
    it(`should call the api - with success`, () => {
      const organization = mockOrganization1
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(httpClient, 'post')
      service.addUserOrganization(id, organization).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/organization`,
        organization,
        httpOptions
      )
    })
    it(`should call the api - with error`, () => {
      const organization = mockOrganization1
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .addUserOrganization(id, organization)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})

      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/organization`,
        organization,
        httpOptions
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When multiple filter are passed in', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUsers))
      throttleTime = (service as any).throttleTime
    })

    it('should debounce the filtering', (done) => {
      const filterConfigLast: IUserFilter = {
        searchText: 'Musterfrau',
        filterItem: [],
      }
      let filterResult: IUser[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredApprovedUsersObservable$.subscribe(callHelper)

      /* Service Init */
      expect(callHelper).toHaveBeenCalledTimes(1)

      /* First filter call after throttle time */
      setTimeout(() => {
        service.setFilter(filterConfig)
        expect(callHelper).toBeCalledTimes(2)
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
        expect(filterResult[0].id).toEqual('456-789')
        done()
      }, throttleTime * 3)
    })
  })

  describe('When the filter logic fails to retrieve data', () => {
    it('should result in an empty array', (done) => {
      const anyService = service as any

      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('error'))

      service.filteredApprovedUsersObservable$
        .pipe(skipUntil(timer(anyService.throttleTime / 2)))
        .subscribe((result) => {
          expect(result).toEqual([])
          done()
        })

      setTimeout(() => {
        service.refreshFilterResult()
      }, anyService.throttleTime + 1)
    })
  })

  describe('When passing in filters', () => {
    test.each(adminFilterTestcases)('It should filter as expected', (testcase) => {
      const anyService = service as any
      anyService.user = { id: '1', organization: { id: 1 } }

      const result = service.filterItems(mockUsersToFilter as IUser[], testcase.filter)
      expect(result.length).toEqual(testcase.resultLength)
    })
  })

  describe('When a batch of users are requested by their ids', () => {
    it('should call the api for each id and return the set', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUserProfile1))
      const result = await service.getUsersByIds(['1', '2', '3']).toPromise()
      expect(result.length).toEqual(3)
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/1`)
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/2`)
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/3`)
    })
  })

  describe('When a call to change the users name comes in', () => {
    const userName = {
      firstName: 'Jest',
      lastName: 'Test',
    }

    it(`should call the api - with success`, () => {
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }

      jest.spyOn(httpClient, 'post')
      service.changeUserName(id, userName.firstName, userName.lastName).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/name`,
        userName,
        httpOptions
      )
    })
    it(`should call the api - with error`, () => {
      const id = '123-456'
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .changeUserName(id, userName.firstName, userName.lastName)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/name`,
        userName,
        httpOptions
      )
    })
  })
})
