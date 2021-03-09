import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockNavigationLinks } from 'src/mocks/data-mocks/navigation-links.mock'

import { ContentService } from './content.service'

describe('ContentService', () => {
  let service: ContentService

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const httpClient: HttpClient = ({
    get: jest.fn(),
    post: jest.fn(),
  } as unknown) as HttpClient

  beforeEach(() => {
    jest.clearAllMocks()
    service = new ContentService(httpClient, appConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getNavigationLinks comes in', () => {
    it('should call the api - with success and set the links to the subject and service', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockNavigationLinks))
      jest.spyOn((service as any).navigationLinksSubject$, 'next')
      await service.getNavigationLinks().toPromise()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/navigation')
      expect((service as any).navigationLinks).toEqual(mockNavigationLinks)
      expect((service as any).navigationLinksSubject$.next).toHaveBeenCalledWith(
        mockNavigationLinks
      )
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getNavigationLinks()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/navigation')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When the navigationLinks are supposed to be updated', () => {
    it('should call the api - with success and set the links to the subject and service', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockNavigationLinks))
      jest.spyOn((service as any).navigationLinksSubject$, 'next')
      await service.updateNavigationLinks(mockNavigationLinks).toPromise()

      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/navigation',
        mockNavigationLinks
      )
      expect((service as any).navigationLinks).toEqual(mockNavigationLinks)
      expect((service as any).navigationLinksSubject$.next).toHaveBeenCalledWith(
        mockNavigationLinks
      )
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .updateNavigationLinks(mockNavigationLinks)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/navigation',
        mockNavigationLinks
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
