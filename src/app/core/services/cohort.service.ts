import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ICohortApi } from 'src/app/shared/models/study/cohort-api.interface'

@Injectable({
  providedIn: 'root',
})
export class CohortService {
  private baseUrl: string

  private cohorts: ICohortApi[] = []
  private cohortsSubject$ = new BehaviorSubject(this.cohorts)
  public cohortsObservable$ = this.cohortsSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/cohort`
  }

  getAll(): Observable<ICohortApi[]> {
    return this.httpClient.get<ICohortApi[]>(this.baseUrl).pipe(
      tap((cohorts) => {
        this.cohorts = cohorts
        this.cohortsSubject$.next(cohorts)
      }),
      catchError(this.handleError)
    )
  }

  save(cohort: ICohortApi): Observable<ICohortApi> {
    return this.httpClient.post<ICohortApi>(this.baseUrl, cohort).pipe(catchError(this.handleError))
  }

  getCohortSize(id: number): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/${id}/size`, {})
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
