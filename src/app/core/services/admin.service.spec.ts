import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockUnapprovedUsers } from 'src/mocks/data-mocks/admin.mock'
import { AdminService } from './admin.service'

describe('AdminService', () => {
  let service: AdminService

  const httpClient = ({
    get: () => of(mockUnapprovedUsers),
    post: () => of({}),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new AdminService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getUnapprovedUsers method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUnapprovedUsers))
      service.getUnapprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/admin/user?approved=false')

      service.unapprovedUsersObservable$.subscribe((users) => {
        expect(users).toEqual(mockUnapprovedUsers)
      })
    })

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service.getUnapprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/admin/user?approved=false')
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
