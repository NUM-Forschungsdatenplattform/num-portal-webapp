import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OrganizationService } from './organization.service'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

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

  beforeEach(() => {
    jest.restoreAllMocks()
    service = new OrganizationService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
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
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/organization')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganizations))
    })
    it('should call the api - with success', () => {
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })
  })

  describe('When a call to getOrganizationById method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
    })

    it('should call the api - with error', () => {
      service
        .getOrganizationById(mockOrganization1.id)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/organization/${mockOrganization1.id}`
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getOrganizationById method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockOrganization1))
    })
    it('should call the api - with success', () => {
      service.getOrganizationById(mockOrganization1.id).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(
        `localhost/api/organization/${mockOrganization1.id}`
      )
    })
  })
})
