import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { inject, TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockApprovedUsers, mockUnapprovedUsers } from 'src/mocks/data-mocks/admin.mock'

import { AdminService } from './admin.service'

describe('AdminService', () => {
  let adminService: AdminService

  const httpClient = ({
    get: () => of(mockApprovedUsers, mockUnapprovedUsers),
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
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AdminService, { provide: AppConfigService, useValue: appConfig }],
    })

    adminService = new AdminService(httpClient, appConfig)
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(adminService).toBeTruthy()
  })

  describe('When a call to getApprovedUsers method comes in', () => {
    it('should call - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockApprovedUsers))
      adminService.getApprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })

    it('should call - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(adminService, 'handleError')
      adminService.getApprovedUsers().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/admin/user?approved=true')
      expect(adminService.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to addUserRoles method comes in', () => {
    it(`should call the api - with success`, inject(
      [AdminService, HttpTestingController],
      (service: AdminService, httpMock: HttpTestingController) => {
        const role = 'TEST_ROLE'
        const id = '123-456'
        service.addUserRoles(id, role).subscribe()

        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === `localhost/api/admin/user/${id}/role` &&
            req.method === 'POST' &&
            req.headers.get('Content-Type') === 'application/json' &&
            req.headers.get('Accept') === 'text/plain' &&
            req.responseType === ('text' as 'json') &&
            req.body === `"${role}"`
          )
        })
      }
    ))

    it(`should call the api - with error`, inject(
      [AdminService, HttpTestingController],
      (service: AdminService, httpMock: HttpTestingController) => {
        const role = 'TEST_ROLE'
        const id = '123-456'
        const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
        const data = 'Invalid request parameters'

        jest.spyOn(service, 'handleError')
        service.addUserRoles(id, role).subscribe()

        httpMock
          .expectOne((req: HttpRequest<any>) => {
            return req.url === `localhost/api/admin/user/${id}/role` && req.method === 'POST'
          })
          .flush(data, mockErrorResponse)

        expect(service.handleError).toHaveBeenCalled()
      }
    ))
  })
})
