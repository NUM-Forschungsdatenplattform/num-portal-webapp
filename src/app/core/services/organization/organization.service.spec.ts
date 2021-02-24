import { HttpClient } from '@angular/common/http'
import { of, Subject, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OrganizationService } from './organization.service'
import { mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { ProfileService } from '../profile/profile.service'
import { mockOAuthUser } from 'src/mocks/data-mocks/admin.mock'
import { mockUserProfile2, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'

describe('OrganizationService', () => {
  let service: OrganizationService

  const httpClient = ({
    get: () => of(mockOrganizations),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const userProfileSubject$ = new Subject<any>()
  const userProfileService = ({
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown) as ProfileService

  beforeEach(() => {
    jest.restoreAllMocks()
    service = new OrganizationService(httpClient, appConfig, userProfileService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in and the user has role SUPER_ADMIN', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganizations))
      service.getAll().subscribe()
      userProfileSubject$.next(mockUserProfile3)
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
      userProfileSubject$.next(mockUserProfile3)
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/organization')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getAll method comes in and the user does not have role SUPER_ADMIN', () => {
    it('should not call the api', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganizations))
      service.getAll().subscribe()
      userProfileSubject$.next(mockUserProfile2)
      expect(httpClient.get).toHaveBeenCalledTimes(0)
    })
  })

  describe('When a call to get method comes in', () => {
    const mockOrganization = { id: '12345a', name: 'Organization A' }
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganization))
      service.get('12345a').subscribe((result) => {
        expect(result).toEqual(mockOrganization)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/organization/12345a`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .get('12345a')
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/organization/12345a`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
