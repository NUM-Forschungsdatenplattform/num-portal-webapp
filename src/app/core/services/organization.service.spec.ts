import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganizationFilter } from 'src/app/shared/models/user/organization-filter.interface'
import { OrganizationService } from './organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

describe('OrganizationService', () => {
  let service: OrganizationService

  let throttleTime: number
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

  const filterConfig: IOrganizationFilter = {
    searchText: 'test',
  }

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

  describe('When multiple filter are passed in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of([]))
      throttleTime = (service as any).throttleTime
    })

    it('should debounce the filtering', (done) => {
      const filterConfigLast: IOrganizationFilter = {
        searchText: 'name1',
      }
      let filterResult: IOrganization[]
      const callHelper = jest.fn((result) => (filterResult = result))
      service.filteredOrganizationsObservable$.subscribe(callHelper)

      /* Service Init */
      expect(callHelper).toHaveBeenCalledTimes(1)

      /* First filter call after throttle time */
      setTimeout(() => {
        service.setFilter(filterConfig)
        expect(callHelper).toHaveBeenCalledTimes(2)
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
        expect(filterResult[0].id).toEqual('1')
        done()
      }, throttleTime * 3)
    })
  })
})
