import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { isStatusSwitchable } from 'src/app/modules/studies/state-machine'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { IStudyComment } from 'src/app/shared/models/study/study-comment.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from '../profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  private baseUrl: string
  private user: IUserProfile

  private studies: IStudyApi[] = []
  private studiesSubject$ = new BehaviorSubject(this.studies)
  public studiesObservable$ = this.studiesSubject$.asObservable()

  private myPublishedStudies: IStudyApi[] = []
  private myPublishedStudiesSubject$ = new BehaviorSubject(this.myPublishedStudies)
  public myPublishedStudiesObservable$ = this.myPublishedStudiesSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/study`
    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
  }

  getAll(): Observable<IStudyApi[]> {
    return this.httpClient.get<IStudyApi[]>(this.baseUrl).pipe(
      tap((studies) => {
        this.studies = studies
        this.studiesSubject$.next(studies)
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IStudyApi> {
    return this.httpClient
      .get<IStudyApi>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  create(study: IStudyApi): Observable<IStudyApi> {
    return this.httpClient.post<IStudyApi>(this.baseUrl, study).pipe(catchError(this.handleError))
  }

  update(study: IStudyApi, id: number): Observable<IStudyApi> {
    return this.httpClient
      .put<IStudyApi>(`${this.baseUrl}/${id}`, study)
      .pipe(catchError(this.handleError))
  }

  updateStatusById(id: number, newStatus: StudyStatus): Observable<IStudyApi> {
    return this.get(id).pipe(
      switchMap((study) => {
        if (study.status === newStatus) {
          return of(study)
        } else if (!!isStatusSwitchable[study.status][newStatus]) {
          study.status = newStatus
          return this.update(study, study.id)
        }

        return throwError('STATUS_NOT_SWITCHABLE')
      }),
      tap(() => {
        this.getAll().subscribe()
      })
    )
  }

  getCommentsByStudyId(id: number): Observable<IStudyComment[]> {
    return this.httpClient
      .get<IStudyComment[]>(`${this.baseUrl}/${id}/comment`)
      .pipe(catchError(this.handleError))
  }

  createCommentByStudyId(id: number, text: string): Observable<IStudyComment> {
    return this.httpClient
      .post<IStudyComment>(`${this.baseUrl}/${id}/comment`, { text })
      .pipe(catchError(this.handleError))
  }

  /**
   * Returns the published studies where the current user is assigned to as researcher
   */
  getMyPublishedStudies(): Observable<IStudyApi[]> {
    let myStudies: IStudyApi[] = []

    if (this.studies.length) {
      myStudies = this.filterItems(this.studies, StudyStatus.Published, this.user.id)
      this.myPublishedStudiesSubject$.next(myStudies)
      return of(myStudies)
    } else {
      return this.getAll().pipe(
        map((allStudies) => {
          myStudies = this.filterItems(allStudies, StudyStatus.Published, this.user.id)
          this.myPublishedStudiesSubject$.next(myStudies)
          return myStudies
        })
      )
    }
  }

  private filterItems(allStudies: IStudyApi[], status: StudyStatus, userId: string): IStudyApi[] {
    let result: IStudyApi[] = []

    result = allStudies.filter(
      (study) =>
        study.status === status &&
        study.researchers.find((researcher) => researcher.userId === userId)
    )
    return result
  }

  executeAdHocAql(aql: string, studyId: number): Observable<IAqlExecutionResponse> {
    return this.httpClient
      .post<IAqlExecutionResponse>(`${this.baseUrl}/${studyId}/execute`, { query: aql })
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
