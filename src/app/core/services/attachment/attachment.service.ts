/**
 * Copyright 2024 Vitagroup AG
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
import { catchError, map, Observable, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private baseUrl: string

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}/attachment`
  }

  downloadAttachment(attachmentId: number): Observable<Blob> {
    return this.httpClient
      .get(`${this.baseUrl}/${attachmentId}`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          if (response.status >= 200 && response.status < 400) {
            return new Blob([response.body], { type: 'application/pdf' })
          } else {
            throw response
          }
        }),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error)
  }
}
