import { HttpClient } from '@angular/common/http'
import { of, Subject, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import {
  mockProjects,
  mockProjects1,
  mockProject1,
  mockProject2,
  mockProject3,
} from 'src/mocks/data-mocks/project.mock'
import {
  projectCommentMock1,
  projectCommentMocks,
} from 'src/mocks/data-mocks/project-comments.mock'
import { cloneDeep } from 'lodash-es'
import { ProjectService } from './project.service'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { ProfileService } from '../profile/profile.service'

describe('ProjectService', () => {
  let service: ProjectService
  const baseUrl = 'localhost/api/study'
  let mockProject1Local

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
    service = new ProjectService(httpClient, appConfig, userProfileService)
    mockProject1Local = cloneDeep(mockProject1)
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAll method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProjects))
      service.getAll().subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(baseUrl)
      service.projectsObservable$.subscribe((projects) => {
        expect(projects).toEqual(mockProjects)
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
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProject1Local))
      service.get(1).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
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
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockProject1Local))
      service.create(mockProject1Local).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
      })
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockProject1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .create(mockProject1Local)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/study`, mockProject1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockProject1Local))
      service.update(mockProject1Local, 1).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
      })
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockProject1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Error'))
      service
        .update(mockProject1Local, 1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/study/${1}`, mockProject1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a comment is supposed to be created on a project', () => {
    it('should post the comment to the api', () => {
      const text = 'TEST'
      const id = 1
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(projectCommentMock1))
      service.createCommentByProjectId(id, text).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(`${baseUrl}/${id}/comment`, { text })
    })
  })

  describe('When comments are supposed to be fetched for a project', () => {
    it('should call the api to get all project comments', () => {
      const id = 1
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(projectCommentMocks))
      service.getCommentsByProjectId(id).subscribe((comments) => {
        expect(comments).toEqual(projectCommentMocks)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/${id}/comment`)
    })
  })

  describe('When the status of a project is supposed to be changed', () => {
    it('should first fetch the project from the api to verify the status and then update the project and fetch all again', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProject1Local))
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockProject1Local))
      service.updateStatusById(1, ProjectStatus.Pending).subscribe()
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/1`)
      expect(httpClient.put).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}`)
    })
  })

  describe('When the status of a project is supposed to be changed to an invalid status', () => {
    it('should first fetch the project and then reject', (done) => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProject1Local))
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockProject1Local))
      service
        .updateStatusById(1, ProjectStatus.Published)
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

  describe('When the getMyPublishedProjects method is called', () => {
    it('should call the myPublishedProjectsSubject$.next with projects the user is assigned to as a researcher and which are in published state', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of([mockProjects1]))
      userProfileSubject$.next(mockUser)

      service.getMyPublishedProjects().subscribe()

      service.myPublishedProjectsObservable$
        .toPromise()
        .then((result) => expect(result).toEqual([mockProject2, mockProject3]))
    })
  })

  describe('When a Export is triggerd', () => {
    it('should post the query', () => {
      const query = 'query'
      const id = 1
      const format = 'csv'
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(projectCommentMock1))
      service.exportFile(id, query, format).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `${baseUrl}/${id}/export?format=csv`,
        { query },
        { responseType: 'text' as 'json' }
      )
    })
  })
})
