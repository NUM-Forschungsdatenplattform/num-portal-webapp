import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl: string

  private projectData: IAqlExecutionResponse = null
  private projectDataSubject$ = new BehaviorSubject(this.projectData)
  private query: string

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}`
  }

  setQuery(query: string) {
    this.query = query
  }

  getData(): Observable<IAqlExecutionResponse> {
    return this.httpClient
      .post<IAqlExecutionResponse>(`${this.baseUrl}/manager/execute/query`, {
        aql: this.query,
      })
      .pipe(
        tap((res) => {
          this.projectData = res
          this.projectDataSubject$.next(res)
        }),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error)
  }
}
