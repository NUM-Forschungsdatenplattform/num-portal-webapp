import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockStudies, mockStudy1 } from 'src/mocks/data-mocks/studies.mock'

import { StudyService } from './study.service'

describe('StudyService', () => {
  let service: StudyService
  const baseUrl = 'localhost/api/study'

  const httpClient = ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  } as unknown) as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    service = new StudyService(httpClient, appConfig)
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockStudies))
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
      service.studiesObservable$.subscribe((studies) => {
        expect(studies).toEqual(mockStudies)
      })
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .getAll()
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/study`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to get method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockStudy1))
      service.get(1).subscribe((result) => {
        expect(result).toEqual(mockStudy1)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/study/${1}`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .get(1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/study/${1}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to create method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockStudy1))
      service.create(mockStudy1).subscribe((result) => {
        expect(result).toEqual(mockStudy1)
      })
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockStudy1)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .create(mockStudy1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockStudy1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockStudy1))
      service.update(mockStudy1, 1).subscribe((result) => {
        expect(result).toEqual(mockStudy1)
      })
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockStudy1)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Error'))
      service
        .update(mockStudy1, 1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockStudy1)
      expect(service.handleError).toHaveBeenCalled()
    })
  })
})
