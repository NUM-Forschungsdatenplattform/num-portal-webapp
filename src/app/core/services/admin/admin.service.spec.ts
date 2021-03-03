import { HttpClient } from '@angular/common/http'
import { of, throwError, timer } from 'rxjs'
import { skipUntil } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockRoles, mockUser, mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization1 } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { AdminService } from './admin.service'

describe('AdminService', () => {
  let service: AdminService
  let throttleTime: number

  const filterConfig: IUserFilter = {
    searchText: 'test',
  }

  const httpClient = ({
    get: jest.fn().mockImplementation(() => of(mockUsers)),
    post: jest.fn().mockImplementation(() => of()),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    jest.restoreAllMocks()
    service = new AdminService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getUnapprovedUsers method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUsers))
      service.getUnapprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/admin/user?approved=false&withRoles=false`
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
        `localhost/api/admin/user?approved=false&withRoles=false`
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
      jest.spyOn(httpClient, 'get').mockImplementation(() => of([]))
      throttleTime = (service as any).throttleTime
    })

    it('should debounce the filtering', async (done) => {
      const filterConfigLast: IUserFilter = {
        searchText: 'Musterfrau',
      }
      let filterResult: IUser[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredApprovedUsersObservable$.subscribe(callHelper)

      /* Service Init */
      expect(callHelper).toHaveBeenCalledTimes(1)

      /* First filter call after throttle time */
      setTimeout(() => {
        service.setFilter(filterConfig)
        expect(callHelper).toBeCalledTimes(3)
      }, throttleTime + 1)

      setTimeout(() => {
        /* Second filter call but within throttle time */
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(3)
      }, throttleTime + 1)

      setTimeout(() => {
        /* Third filter call but within throttle time */
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(3)
      }, throttleTime + 10)

      setTimeout(() => {
        /* Fourth filter call, meanwhile the third filter was pushed */
        service.setFilter(filterConfigLast)
        expect(callHelper).toHaveBeenCalledTimes(5)
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
})
