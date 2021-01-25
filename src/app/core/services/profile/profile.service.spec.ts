import { ProfileService } from './profile.service'
import { of, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { mockUserProfile1, mockUserProfiles } from '../../../../mocks/data-mocks/user-profile.mock'
import { AppConfigService } from '../../../config/app-config.service'

describe('ProfileService', () => {
  let service: ProfileService

  const httpClient = ({
    get: () => of(mockUserProfile1),
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
    service = new ProfileService(httpClient, appConfig)
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
        .get()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/profile')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getAll method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUserProfiles))
    })
    it('should call the api - with success', () => {
      service.get().subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })
  })
})
