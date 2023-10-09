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
import { of, Subject, throwError, timer } from 'rxjs'
import { AppConfigService } from 'projects/num-lib/src/lib/config/app-config.service'
import {
  mockProjects,
  mockProjects1,
  mockProject1,
  mockProject2,
  mockProject3,
  mockProject4,
  mockProject5,
} from 'src/mocks/data-mocks/project.mock'
import {
  projectCommentMock1,
  projectCommentMocks,
} from 'src/mocks/data-mocks/project-comments.mock'
import { cloneDeep } from 'lodash-es'
import { ProjectService } from './project.service'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { ProfileService } from '../profile/profile.service'
import { skipUntil } from 'rxjs/operators'
import { projectFilterTestcases } from './project-filter-testcases'
import { mockResultSetFlat } from 'src/mocks/data-mocks/result-set-mock'
import { IProjectApi } from '../../../shared/models/project/project-api.interface'
import { IProjectFilter } from '../../../shared/models/project/project-filter.interface'
import { ProjectStatus } from '../../../shared/models/project/project-status.enum'

describe('ProjectService', () => {
  let service: ProjectService
  const baseUrl = 'localhost/api/project'
  let mockProject1Local
  let throttleTime: number

  const filterConfig: IProjectFilter = {
    filterItem: [],
    searchText: 'test',
  }

  const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  } as unknown as HttpClient

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const userProfileSubject$ = new Subject<any>()
  const userProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(httpClient, 'get').mockImplementation(() => of())
    service = new ProjectService(httpClient, appConfig, userProfileService)
    mockProject1Local = cloneDeep(mockProject1)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When a call to getAllPag method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProjects))
      service.getAllPag(0, 2, 'ASC', 'name', { type: 'OWNED' }, 'en').subscribe()
      expect(httpClient.get).toHaveBeenCalled()
    })
    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'))
      jest.spyOn(service, 'handleError')
      service
        .getAllPag(0, 2, 'ASC', 'name', { type: 'OWNED' }, 'en')
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(
        'localhost/api/project/all?page=0&size=2&sort=ASC&sortBy=name&filter%5Btype%5D=OWNED&language=en'
      )
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to get method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProject1Local))
      service.get(1).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
      })
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/project/${1}`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('Error'))
      service
        .get(1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.get).toHaveBeenCalledWith(`localhost/api/project/${1}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to create method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(mockProject1Local))
      service.create(mockProject1Local).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
      })
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/project`, mockProject1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .create(mockProject1Local)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(`localhost/api/project`, mockProject1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to update method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'put').mockImplementation(() => of(mockProject1Local))
      service.update(mockProject1Local, 1).subscribe((result) => {
        expect(result).toEqual(mockProject1Local)
      })
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/project/${1}`, mockProject1Local)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'put').mockImplementationOnce(() => throwError('Error'))
      service
        .update(mockProject1Local, 1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.put).toHaveBeenCalledWith(`localhost/api/project/${1}`, mockProject1Local)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to delete method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'delete').mockImplementation(() => of(mockProject1Local))
      service.delete(1).subscribe()
      expect(httpClient.delete).toHaveBeenCalledWith(`localhost/api/project/${1}`)
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'delete').mockImplementationOnce(() => throwError('Error'))
      service
        .delete(1)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.delete).toHaveBeenCalledWith(`localhost/api/project/${1}`)
      expect(service.handleError).toHaveBeenCalled()
    })
  })

  describe('When a call to execute method comes in', () => {
    it(`should call the api - with success`, () => {
      jest.spyOn(httpClient, 'post').mockImplementation(() => of([mockResultSetFlat]))
      service.executeAdHocAql('query', 1, true).subscribe((result) => {
        expect(result).toEqual([mockResultSetFlat])
      })
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/project/${1}/execute?defaultConfiguration=true`,
        {
          query: 'query',
        }
      )
    })
    it(`should call the api - with error`, () => {
      jest.spyOn(service, 'handleError')
      jest.spyOn(httpClient, 'post').mockImplementationOnce(() => throwError('Error'))
      service
        .executeAdHocAql('query', 1, false)
        .toPromise()
        .then((_) => {})
        .catch((_) => {})
      expect(httpClient.post).toHaveBeenCalledWith(
        `localhost/api/project/${1}/execute?defaultConfiguration=false`,
        {
          query: 'query',
        }
      )
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

  describe('When a call to getAllWithCache comes in', () => {
    it('should respond with the cached projects if they are existing', (done) => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockProjects1))
      jest.clearAllMocks()
      const anyService = service as any
      anyService.projects = mockProjects
      service.getAllWithCache().subscribe((projects) => {
        expect(projects).toEqual(mockProjects)
        expect(httpClient.get).not.toHaveBeenCalled()
        done()
      })
    })
  })

  describe('When a Export is triggerd', () => {
    it('should post the query', () => {
      const query = 'query'
      const id = 1
      const format = 'csv'
      jest.spyOn(httpClient, 'post').mockImplementation(() => of(projectCommentMock1))
      service.exportFile(id, query, format, true).subscribe()
      expect(httpClient.post).toHaveBeenCalledWith(
        `${baseUrl}/${id}/export?format=csv&defaultConfiguration=true`,
        { query },
        { responseType: 'blob' as 'json' }
      )
    })
  })

  describe('When the filter logic fails to retrieve data', () => {
    it('should result in an empty array', (done) => {
      const anyService = service as any

      anyService.projects = []
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('error'))

      service.filteredProjectsObservable$
        .pipe(skipUntil(timer(anyService.throttleTime / 2)))
        .subscribe((result) => {
          expect(result).toEqual([])
          done()
        })

      setTimeout(() => {
        service.setFilter(filterConfig)
      }, anyService.throttleTime + 1)
    })
  })

  describe('When passing in filters', () => {
    test.each(projectFilterTestcases)('It should filter as expected', (testcase) => {
      const anyService = service as any
      anyService.user = { id: '123', organization: { id: 1 } }

      const result = service.filterItems(
        [...mockProjects, mockProject4] as IProjectApi[],
        testcase.filter
      )
      expect(result.length).toEqual(testcase.resultLength)
    })
  })
})
