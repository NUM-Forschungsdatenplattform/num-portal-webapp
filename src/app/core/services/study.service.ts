import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

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
    return this.httpClient.get<IStudyApi>(`${this.baseUrl}/${id}`)
  }

  create(study: IStudyApi): Observable<IStudyApi> {
    return this.httpClient.post<IStudyApi>(this.baseUrl, study).pipe(catchError(this.handleError))
  }

  update(study: IStudyApi, id: number): Observable<IStudyApi> {
    return this.httpClient
      .put<IStudyApi>(`${this.baseUrl}/${id}`, study)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
