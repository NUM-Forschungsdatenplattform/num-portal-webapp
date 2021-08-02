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

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { isStatusSwitchable } from 'src/app/modules/projects/state-machine'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'
import { ProjectFilterChipId } from 'src/app/shared/models/project/project-filter-chip.enum'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { environment } from 'src/environments/environment'
import { DEFAULT_PROJECT_FILTER } from '../../constants/default-filter-project'
import { ProfileService } from '../profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300
  private baseUrl: string
  private user: IUserProfile

  private projects: IProjectApi[] = []
  private projectSubject$ = new BehaviorSubject(this.projects)
  public projectsObservable$ = this.projectSubject$.asObservable()

  private myPublishedProjects: IProjectApi[] = []
  private myPublishedProjectsSubject$ = new BehaviorSubject(this.myPublishedProjects)
  public myPublishedProjectsObservable$ = this.myPublishedProjectsSubject$.asObservable()

  private filteredProjects: IProjectApi[] = []
  private filteredProjectsSubject$ = new BehaviorSubject(this.filteredProjects)
  public filteredProjectsObservable$ = this.filteredProjectsSubject$.asObservable()

  private filterSet: IProjectFilter = DEFAULT_PROJECT_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/project`
    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredProjectsSubject$.next(filterResult))
  }

  getAll(): Observable<IProjectApi[]> {
    return this.httpClient.get<IProjectApi[]>(this.baseUrl).pipe(
      tap((projects) => {
        this.projects = projects
        this.projectSubject$.next(projects)
        if (this.projects.length) {
          this.setFilter(this.filterSet)
        }
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IProjectApi> {
    return this.httpClient
      .get<IProjectApi>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  create(project: IProjectApi): Observable<IProjectApi> {
    return this.httpClient
      .post<IProjectApi>(this.baseUrl, project)
      .pipe(catchError(this.handleError))
  }

  update(project: IProjectApi, id: number): Observable<IProjectApi> {
    return this.httpClient
      .put<IProjectApi>(`${this.baseUrl}/${id}`, project)
      .pipe(catchError(this.handleError))
  }

  delete(projectId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${projectId}`).pipe(
      tap(() => {
        this.getAll().subscribe()
      }),
      catchError(this.handleError)
    )
  }

  archive(projectId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${projectId}/archive`, {}).pipe(
      tap(() => {
        this.getAll().subscribe()
      }),
      catchError(this.handleError)
    )
  }

  updateStatusById(id: number, newStatus: ProjectStatus): Observable<IProjectApi> {
    return this.get(id).pipe(
      switchMap((project) => {
        if (project.status === newStatus) {
          return of(project)
        } else if (!!isStatusSwitchable[project.status][newStatus]) {
          switch (newStatus) {
            case ProjectStatus.ToBeDeleted:
              return this.delete(project.id)
            case ProjectStatus.Archived:
              return this.archive(project.id)
            default:
              project.status = newStatus
              return this.update(project, project.id)
          }
        }

        return throwError('STATUS_NOT_SWITCHABLE')
      }),
      tap(() => {
        this.getAll().subscribe()
      })
    )
  }

  getCommentsByProjectId(id: number): Observable<IProjectComment[]> {
    return this.httpClient
      .get<IProjectComment[]>(`${this.baseUrl}/${id}/comment`)
      .pipe(catchError(this.handleError))
  }

  createCommentByProjectId(id: number, text: string): Observable<IProjectComment> {
    return this.httpClient
      .post<IProjectComment>(`${this.baseUrl}/${id}/comment`, { text })
      .pipe(catchError(this.handleError))
  }

  exportFile(
    id: number,
    query: string,
    format: string,
    defaultConfiguration: boolean
  ): Observable<string> {
    return this.httpClient
      .post<string>(
        `${this.baseUrl}/${id}/export?format=${format}&defaultConfiguration=${defaultConfiguration}`,
        { query },
        { responseType: (format === 'json' ? 'text' : 'blob') as 'json' }
      )
      .pipe(catchError(this.handleError))
  }

  getAllWithCache(): Observable<IProjectApi[]> {
    if (this.projects.length) {
      return of(this.projects)
    } else {
      return this.getAll()
    }
  }

  /**
   * Returns the published projects where the current user is coordinator of or is assigned to as researcher
   */
  getMyPublishedProjects(): Observable<IProjectApi[]> {
    let myProjects: IProjectApi[] = []

    return this.getAllWithCache().pipe(
      map((allProjects) => {
        myProjects = allProjects
          .filter((project) => project.status === ProjectStatus.Published)
          .filter(
            (project) =>
              project.researchers.find((researcher) => researcher.userId === this.user.id) ||
              project.coordinator.id === this.user.id
          )
        this.myPublishedProjectsSubject$.next(myProjects)
        return myProjects
      })
    )
  }

  setFilter(filterSet: IProjectFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IProjectFilter): Observable<IProjectApi[]> {
    if (this.projects.length) {
      return of(this.filterItems(this.projects, filterSet))
    } else {
      return this.getAll().pipe(
        map((projectArray) => {
          return this.filterItems(projectArray, filterSet)
        }),
        catchError(() => {
          return of([])
        })
      )
    }
  }

  filterItems(allProjects: IProjectApi[], filterSet: IProjectFilter): IProjectApi[] {
    let result: IProjectApi[] = allProjects

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toLowerCase().trim()

      result = allProjects.filter(
        (project) =>
          project.name?.toLowerCase().includes(textFilter) ||
          project.coordinator?.lastName?.toLowerCase().includes(textFilter) ||
          project.coordinator?.firstName?.toLowerCase().includes(textFilter) ||
          project.coordinator?.firstName
            ?.concat(' ', project.coordinator?.lastName)
            .toLowerCase()
            .includes(textFilter) ||
          project.coordinator?.lastName
            ?.concat(' ', project.coordinator?.firstName)
            .toLowerCase()
            .includes(textFilter)
      )
    }

    filterSet.filterItem.forEach((filterItem) => {
      if (filterItem.isSelected) {
        switch (filterItem.id) {
          case ProjectFilterChipId.MyProjects:
            result = result.filter(
              (project) =>
                project.coordinator?.id === this.user.id &&
                project.status !== ProjectStatus.Archived
            )
            break
          case ProjectFilterChipId.OrganizationProjects:
            result = result.filter(
              (project) =>
                project.coordinator?.organization?.id === this.user.organization?.id &&
                project.status !== ProjectStatus.Archived
            )
            break
          case ProjectFilterChipId.Archived:
            result = result.filter((project) => project.status === ProjectStatus.Archived)
            break

          default:
            result = result.filter((project) => project.status !== ProjectStatus.Archived)
            break
        }
      }
    })

    return result
  }

  executeAdHocAql(
    query: string,
    projectId: number,
    defaultConfiguration: boolean
  ): Observable<IAqlExecutionResponse[]> {
    return this.httpClient
      .post<IAqlExecutionResponse[]>(
        `${this.baseUrl}/${projectId}/execute?defaultConfiguration=${defaultConfiguration}`,
        { query }
      )
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
