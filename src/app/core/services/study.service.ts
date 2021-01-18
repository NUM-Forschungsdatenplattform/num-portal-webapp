import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { isStatusSwitchable } from 'src/app/modules/studies/state-machine'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { IStudyComment } from 'src/app/shared/models/study/study-comment.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  private baseUrl: string

  private studies: IStudyApi[] = []
  private studiesSubject$ = new BehaviorSubject(this.studies)
  public studiesObservable$ = this.studiesSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/study`
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
        if (!!isStatusSwitchable[study.status][newStatus]) {
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

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
