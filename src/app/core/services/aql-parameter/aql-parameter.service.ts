import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, shareReplay } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAqlParameterValuesApi } from 'src/app/shared/models/aql/aql-parameter-values.interface'

@Injectable({
  providedIn: 'root',
})
export class AqlParameterService {
  private baseUrl: string
  private valueCache = new Map<string, Observable<IAqlParameterValuesApi>>()

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}/aql/parameter`
  }

  getValues(aqlPath: string, archetypeId: string): Observable<IAqlParameterValuesApi> {
    const cacheKey = `${archetypeId}_${aqlPath}`

    if (!this.valueCache.get(cacheKey)) {
      const params = new HttpParams({ fromObject: { archetypeId, aqlPath } })
      this.valueCache.set(
        cacheKey,
        this.httpClient
          .get<IAqlParameterValuesApi>(`${this.baseUrl}/values`, { params })
          .pipe(shareReplay(), catchError(this.handleError))
      )
    }
    return this.valueCache.get(cacheKey)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
