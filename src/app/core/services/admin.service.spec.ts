import { HttpClientModule, HttpRequest } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { inject, TestBed } from '@angular/core/testing'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockUnapprovedUsers } from 'src/mocks/data-mocks/admin.mock'
import { AdminService } from './admin.service'

describe('AdminService', () => {
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
  })

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify()
  }))

  describe('When a call to getUnapprovedUsers method comes in', () => {
    it(`should call the api - with success`, inject(
      [AdminService, HttpTestingController],
      (service: AdminService, httpMock: HttpTestingController) => {
        service.getUnapprovedUsers().subscribe()

        httpMock
          .expectOne((req: HttpRequest<any>) => {
            return req.url === `localhost/api/admin/user?approved=false` && req.method === 'GET'
          })
          .flush(mockUnapprovedUsers)

        service.unapprovedUsersObservable$.subscribe((users) => {
          expect(users).toEqual(mockUnapprovedUsers)
        })
      }
    ))

    it(`should call the api - with error`, inject(
      [AdminService, HttpTestingController],
      (service: AdminService, httpMock: HttpTestingController) => {
        const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
        const data = 'Invalid request parameters'

        jest.spyOn(service, 'handleError')
        service.getUnapprovedUsers().subscribe()

        httpMock
          .expectOne((req: HttpRequest<any>) => {
            return req.url === `localhost/api/admin/user?approved=false` && req.method === 'GET'
          })
          .flush(data, mockErrorResponse)

        expect(service.handleError).toHaveBeenCalled()
      }
    ))
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
