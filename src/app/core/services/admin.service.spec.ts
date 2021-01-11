import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockRoles, mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization1 } from 'src/mocks/data-mocks/organizations.mock'
import { AdminService } from './admin.service'

describe('AdminService', () => {
  let service: AdminService

  const httpClient = ({
    get: () => of(),
    post: () => of(),
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

      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user?approved=false`)

      service.unapprovedUsersObservable$.subscribe((users) => {
        expect(users).toEqual(mockUsers)
      })
    })

    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      service.getUnapprovedUsers().subscribe()

      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user?approved=false`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getApprovedUsers method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUsers))
      service.getApprovedUsers().subscribe()

      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user?approved=true`)

      service.approvedUsersObservable$.subscribe((users) => {
        expect(users).toEqual(mockUsers)
      })
    })

    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      service.getApprovedUsers().subscribe()

      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user?approved=true`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getUserRoles method comes in', () => {
    it(`should call the api - with success`, () => {
      const id = '123-456'

      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockRoles))
      service.getUserRoles(id).subscribe()

      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/admin/user/${id}/role`)
    })

    it(`should call the api - with error`, () => {
      const id = '123-456'

      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      service.getUserRoles(id).subscribe()

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
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      service.addUserRoles(id, roles).subscribe()

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
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      service.addUserOrganization(id, organization).subscribe()

      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/admin/user/${id}/organization`,
        organization,
        httpOptions
      )

      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
