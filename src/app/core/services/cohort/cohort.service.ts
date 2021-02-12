import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ICohortApi } from 'src/app/shared/models/study/cohort-api.interface'

@Injectable({
  providedIn: 'root',
})
export class CohortService {
  private baseUrl: string

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/cohort`
  }

  get(id: number): Observable<ICohortApi> {
    if (id === undefined || id === null) {
      return of(undefined)
    }
    return this.httpClient
      .get<ICohortApi>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  create(cohort: ICohortApi): Observable<ICohortApi> {
    return this.httpClient.post<ICohortApi>(this.baseUrl, cohort).pipe(catchError(this.handleError))
  }

  update(cohort: ICohortApi, id: number): Observable<ICohortApi> {
    return this.httpClient
      .put<ICohortApi>(`${this.baseUrl}/${id}`, cohort)
      .pipe(catchError(this.handleError))
  }

  getCohortSize(cohort: ICohortApi, id: number): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/${id}/size`, cohort)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
