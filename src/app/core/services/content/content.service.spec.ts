/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockDashboardCards } from 'src/mocks/data-mocks/dashboard-cards.mock'
import { mockDashboardMetrics } from 'src/mocks/data-mocks/dashboard-metrics.mock'
import { mockDashboardProjects } from 'src/mocks/data-mocks/dashboard-projects.mock'
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

  const httpClient: HttpClient = {
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as HttpClient

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
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockNavigationLinks))
      jest.spyOn((service as any).navigationLinksSubject$, 'next')
      await service.updateNavigationLinks(mockNavigationLinks).toPromise()

      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/navigation',
        mockNavigationLinks,
        httpOptions
      )
      expect((service as any).navigationLinks).toEqual(mockNavigationLinks)
      expect((service as any).navigationLinksSubject$.next).toHaveBeenCalledWith(
        mockNavigationLinks
      )
    })

    it('should call the api - with error', async () => {
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .updateNavigationLinks(mockNavigationLinks)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/navigation',
        mockNavigationLinks,
        httpOptions
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getCards comes in', () => {
    it('should call the api - with success and set the cards to the subject and service', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockDashboardCards))
      jest.spyOn((service as any).cardsSubject$, 'next')
      await service.getCards().toPromise()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/cards')
      expect((service as any).cards).toEqual(mockDashboardCards)
      expect((service as any).cardsSubject$.next).toHaveBeenCalledWith(mockDashboardCards)
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getCards()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/cards')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When the cards are supposed to be updated', () => {
    it('should call the api - with success and set the cards to the subject and service', async () => {
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockDashboardCards))
      jest.spyOn((service as any).cardsSubject$, 'next')
      await service.updateCards(mockDashboardCards).toPromise()

      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/cards',
        mockDashboardCards,
        httpOptions
      )
      expect((service as any).cards).toEqual(mockDashboardCards)
      expect((service as any).cardsSubject$.next).toHaveBeenCalledWith(mockDashboardCards)
    })

    it('should call the api - with error', async () => {
      const httpOptions = {
        responseType: 'text' as 'json',
      }
      jest.spyOn(httpClient, 'post').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .updateCards(mockDashboardCards)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        'localhost/api/content/cards',
        mockDashboardCards,
        httpOptions
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getMetrics comes in', () => {
    it('should call the api - with success and set the metrics to the subject and service', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockDashboardMetrics))
      jest.spyOn((service as any).metricsSubject$, 'next')
      await service.getMetrics().toPromise()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/metrics')
      expect((service as any).metrics).toEqual(mockDashboardMetrics)
      expect((service as any).metricsSubject$.next).toHaveBeenCalledWith(mockDashboardMetrics)
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getMetrics()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/metrics')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getLatestProjects comes in', () => {
    it('should call the api - with success and set the projects to the subject and service', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockDashboardProjects))
      jest.spyOn((service as any).projectsSubject$, 'next')
      await service.getLatestProjects().toPromise()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/latest-projects')
      expect((service as any).projects).toEqual(mockDashboardProjects)
      expect((service as any).projectsSubject$.next).toHaveBeenCalledWith(mockDashboardProjects)
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getLatestProjects()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/latest-projects')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getClinics comes in', () => {
    const mockClinics = ['clinic1', 'clinic2', 'clinic3']
    it('should call the api - with success', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockClinics))
      service.getClinics().subscribe()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/graph/clinic')
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getClinics()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/graph/clinic')
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getSofaScoreDistribution comes in', () => {
    const mockDistribution = { '0-4': 3, '5-9': 1, '10-14': 6, '15-19': 2, '20-24': 0 }
    it('should call the api - with success', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockDistribution))
      service.getSofaScoreDistribution('clinic1')

      expect(httpClient.get).toHaveBeenCalledWith(
        'localhost/api/content/graph/clinic/clinic1/sofaDistribution'
      )
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getSofaScoreDistribution('clinic1')
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        'localhost/api/content/graph/clinic/clinic1/sofaDistribution'
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to getSofaScoreAverage comes in', () => {
    const mockSofaAvg = { clinic1: 5.0, clinic2: 6.0, clinic3: 2.3567 }
    it('should call the api - with success', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockSofaAvg))
      service.getSofaScoreAverage().subscribe()

      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/graph/clinic/sofaAverage')
    })

    it('should call the api - with error', async () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      await service
        .getSofaScoreAverage()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/content/graph/clinic/sofaAverage')
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
