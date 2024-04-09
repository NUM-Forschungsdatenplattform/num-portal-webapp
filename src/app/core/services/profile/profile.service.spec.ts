import { ProfileService } from './profile.service'
import { of, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { mockUserProfile1 } from '../../../../mocks/data-mocks/user-profile.mock'
import { AppConfigService } from '../../../config/app-config.service'

describe('ProfileService', () => {
  let service: ProfileService

  const httpClient = {
    get: () => of(mockUserProfile1),
    post: jest.fn(),
  } as unknown as HttpClient

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

  describe('When a call to get method comes in', () => {
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

  describe('When call to setUnapproveUser comes in', () => {
    beforeEach(() => {
      jest.spyOn(service, 'setUnapproveUser')
    })
    it('should set unapproved user to true', () => {
      service.setUnapproveUser(true)
      expect(service.setUnapproveUser).toHaveBeenCalled()
      expect(service.userNotApproved).toEqual(true)
    })
  })

  describe('When a call to get method comes in', () => {
    beforeEach(() => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockUserProfile1))
    })
    it('should call the api - with success', () => {
      service.get().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${appConfig.config.api.baseUrl}/profile`)
    })
  })

  describe('When a call to changeUserName method comes in', () => {
    const firstName = 'first'
    const lastName = 'last'

    beforeEach(() => {
      const anyService = service as any
      anyService.userProfile.id = '1-2-3'
    })

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')

      service
        .changeUserName(firstName, lastName)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})

      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/admin/user/1-2-3/name',
        {
          firstName,
          lastName,
        },
        { responseType: 'text' }
      )
      expect(service.handleError).toHaveBeenCalled()
    })

    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of())

      service.changeUserName(firstName, lastName)
      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/admin/user/1-2-3/name',
        {
          firstName,
          lastName,
        },
        { responseType: 'text' }
      )
    })
  })
})
