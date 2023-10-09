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
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, shareReplay } from 'rxjs/operators'
import { AppConfigService } from 'projects/num-lib/src/lib/config/app-config.service'
import { IAqlParameterValuesApi } from '../../../shared/models/aql/aql-parameter-values.interface'

@Injectable({
  providedIn: 'root',
})
export class AqlParameterService {
  private baseUrl: string
  private valueCache = new Map<string, Observable<IAqlParameterValuesApi>>()

  constructor(private appConfigService: AppConfigService, private httpClient: HttpClient) {
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
