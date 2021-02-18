import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OrganizationService } from './organization.service'
import { mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

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
