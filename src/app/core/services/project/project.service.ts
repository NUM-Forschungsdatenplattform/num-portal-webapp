import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { isStatusSwitchable } from 'src/app/modules/projects/state-machine'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from '../profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string
  private user: IUserProfile

  private projects: IProjectApi[] = []
  private projectSubject$ = new BehaviorSubject(this.projects)
  public projectsObservable$ = this.projectSubject$.asObservable()

  private myPublishedProjects: IProjectApi[] = []
  private myPublishedProjectsSubject$ = new BehaviorSubject(this.myPublishedProjects)
  public myPublishedProjectsObservable$ = this.myPublishedProjectsSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    // TODO we need to change the api from 'study' to 'project'
    this.baseUrl = `${appConfig.config.api.baseUrl}/study`
    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
  }

  getAll(): Observable<IProjectApi[]> {
    return this.httpClient.get<IProjectApi[]>(this.baseUrl).pipe(
      tap((projects) => {
        this.projects = projects
        this.projectSubject$.next(projects)
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

  updateStatusById(id: number, newStatus: ProjectStatus): Observable<IProjectApi> {
    return this.get(id).pipe(
      switchMap((project) => {
        if (project.status === newStatus) {
          return of(project)
        } else if (!!isStatusSwitchable[project.status][newStatus]) {
          project.status = newStatus
          return this.update(project, project.id)
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

  exportFile(id: number, query: string, format: string): Observable<string> {
    return this.httpClient
      .post<string>(
        `${this.baseUrl}/${id}/export?format=${format}`,
        { query },
        { responseType: 'text' as 'json' }
      )
      .pipe(catchError(this.handleError))
  }

  /**
   * Returns the published projects where the current user is coordinator of or is assigned to as researcher
   */
  getMyPublishedProjects(): Observable<IProjectApi[]> {
    let myProjects: IProjectApi[] = []

    if (this.projects.length) {
      myProjects = this.filterItems(this.projects, ProjectStatus.Published, this.user.id)
      this.myPublishedProjectsSubject$.next(myProjects)
      return of(myProjects)
    } else {
      return this.getAll().pipe(
        map((allProjects) => {
          myProjects = this.filterItems(allProjects, ProjectStatus.Published, this.user.id)
          this.myPublishedProjectsSubject$.next(myProjects)
          return myProjects
        })
      )
    }
  }

  private filterItems(
    allProjects: IProjectApi[],
    status: ProjectStatus,
    userId: string
  ): IProjectApi[] {
    let result: IProjectApi[] = []

    result = allProjects
      .filter((project) => project.status === status)
      .filter(
        (project) =>
          project.researchers.find((researcher) => researcher.userId === userId) ||
          project.coordinator.id === userId
      )
    return result
  }

  executeAdHocAql(aql: string, projectId: number): Observable<IAqlExecutionResponse> {
    return this.httpClient
      .post<IAqlExecutionResponse>(`${this.baseUrl}/${projectId}/execute`, { query: aql })
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
