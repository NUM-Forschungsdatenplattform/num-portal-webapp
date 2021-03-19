import { HttpClient } from '@angular/common/http'
import { of, Subject, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import {
  mockStudies,
  mockStudies1,
  mockStudy1,
  mockStudy2,
  mockStudy3,
} from 'src/mocks/data-mocks/studies.mock'
import { studyCommentMock1, studyCommentMocks } from 'src/mocks/data-mocks/study-comments.mock'
import { cloneDeep } from 'lodash-es'
import { StudyService } from './study.service'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { ProfileService } from '../profile/profile.service'

describe('StudyService', () => {
  let service: StudyService
  const baseUrl = 'localhost/api/study'
  let mockStudy1Local

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

  const userProfileSubject$ = new Subject<any>()
  const userProfileService = ({
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown) as ProfileService

  beforeEach(() => {
    service = new StudyService(httpClient, appConfig, userProfileService)
    mockStudy1Local = cloneDeep(mockStudy1)
    jest.restoreAllMocks()
    jest.clearAllMocks()
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
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockStudy1Local))
      service.get(1).subscribe((result) => {
        expect(result).toEqual(mockStudy1Local)
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
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockStudy1Local))
      service.create(mockStudy1Local).subscribe((result) => {
        expect(result).toEqual(mockStudy1Local)
      })
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockStudy1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .create(mockStudy1Local)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockStudy1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockStudy1Local))
      service.update(mockStudy1Local, 1).subscribe((result) => {
        expect(result).toEqual(mockStudy1Local)
      })
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockStudy1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Error'))
      service
        .update(mockStudy1Local, 1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockStudy1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a comment is supposed to be created on a study', () => {
    it('should post the comment to the api', () => {
      const text = 'TEST'
      const id = 1
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(studyCommentMock1))
      service.createCommentByStudyId(id, text).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/${id}/comment`, { text })
    })
  })

  describe('When comments are supposed to be fetched for a study', () => {
    it('should call the api to get all study comments', () => {
      const id = 1
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(studyCommentMocks))
      service.getCommentsByStudyId(id).subscribe((comments) => {
        expect(comments).toEqual(studyCommentMocks)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/${id}/comment`)
    })
  })

  describe('When the status of a study is supposed to be changed', () => {
    it('should first fetch the study from the api to verify the status and then update the study and fetch all again', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockStudy1Local))
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockStudy1Local))
      service.updateStatusById(1, StudyStatus.Pending).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/1`)
      expect(httpClient.put).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}`)
    })
  })

  describe('When the status of a study is supposed to be changed to an invalid status', () => {
    it('should first fetch the study and then reject', (done) => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockStudy1Local))
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockStudy1Local))
      service
        .updateStatusById(1, StudyStatus.Published)
        .toPromise()
        .then((_) => {})
        .catch((error) => {
          expect(error).toEqual('STATUS_NOT_SWITCHABLE')
          done()
        })
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/1`)
      expect(httpClient.put).not.toHaveBeenCalled()
    })
  })

  describe('When the getMyPublishedStudies method is called', () => {
    it('should call the myPublishedStudiesSubject$.next with studies the user is assigned to as a researcher and which are in published state', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of([mockStudies1]))
      userProfileSubject$.next(mockUser)

      service.getMyPublishedStudies().subscribe()

      service.myPublishedStudiesObservable$
        .toPromise()
        .then((result) => expect(result).toEqual([mockStudy2, mockStudy3]))
    })
  })

  describe('When a Export is triggerd', () => {
    it('should post the query', () => {
      const query = 'query'
      const id = 1
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(studyCommentMock1))
      service.exportCsv(id, query).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `${baseUrl}/${id}/export`,
        { query },
        { responseType: 'text' as 'json' }
      )
    })
  })
})
