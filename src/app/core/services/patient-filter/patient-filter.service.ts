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
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'
import { ICohortGroupApi } from 'src/app/shared/models/project/cohort-group-api.interface'

@Injectable({
  providedIn: 'root',
})
export class PatientFilterService {
  private baseUrl: string

  private totalDatasetCount = 0
  private totalDatasetCountSubject$ = new BehaviorSubject(this.totalDatasetCount)
  totalDatasetCountObservable$ = this.totalDatasetCountSubject$.asObservable()

  private previewData: ICohortPreviewApi = {
    ages: {},
    count: 0,
    hospitals: {},
  }
  private previewDataSubject$ = new BehaviorSubject(this.previewData)
  previewDataObservable$ = this.previewDataSubject$.asObservable()

  constructor(private appConfigService: AppConfigService, private httpClient: HttpClient) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}`
  }

  getAllDatasetCount(): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/aql/size`, {
        query: 'SELECT e/ehr_id/value as ehrId FROM EHR e WHERE EXISTS e/ehr_id/value',
      })
      .pipe(
        tap((size) => {
          this.totalDatasetCount = size
          this.totalDatasetCountSubject$.next(size)
        }),
        catchError(this.handleError)
      )
  }

  getPreviewData(
    cohortGroup: ICohortGroupApi,
    allowUsageOutsideEu = true
  ): Observable<ICohortPreviewApi> {
    return this.httpClient
      .post<ICohortPreviewApi>(
        `${this.baseUrl}/cohort/size/distribution?allowUsageOutsideEu=${allowUsageOutsideEu}`,
        cohortGroup
      )
      .pipe(
        tap((res) => {
          this.previewData = res
          this.previewDataSubject$.next(res)
        }),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
