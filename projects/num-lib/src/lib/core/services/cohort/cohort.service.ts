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
import { Observable, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'projects/num-lib/src/lib/config/app-config.service'
import { IDictionary } from '../../../shared/models/dictionary.interface'
import { ICohortApi } from '../../../shared/models/project/cohort-api.interface'
import { ICohortGroupApi } from '../../../shared/models/project/cohort-group-api.interface'

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

  getSize(cohortGroup: ICohortGroupApi, allowUsageOutsideEu = true): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/size?allowUsageOutsideEu=${allowUsageOutsideEu}`, cohortGroup)
      .pipe(catchError(this.handleError))
  }

  getSizeForTemplates(
    cohortGroup: ICohortGroupApi,
    templateIds: string[]
  ): Observable<IDictionary<string, number>> {
    return this.httpClient
      .post<IDictionary<string, number>>(`${this.baseUrl}/size/template`, {
        cohortDto: { cohortGroup },
        templateIds,
      })
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
