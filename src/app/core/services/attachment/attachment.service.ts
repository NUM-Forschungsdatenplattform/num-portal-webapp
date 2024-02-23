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
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AttachmentUploadProgress } from 'src/app/shared/models/attachment/attachment-upload-progress.interface'
import { AttachmentUploadStatus } from 'src/app/shared/models/attachment/attachment-upload-status.enum'

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private baseUrl: string
  private uploadProgressSubject$ = new BehaviorSubject<AttachmentUploadProgress>({
    percentage: 0,
    status: AttachmentUploadStatus.IDLE,
  })
  public uploadProgressObservable$ = this.uploadProgressSubject$.asObservable()

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}/attachment`
  }

  downloadAttachment(attachmentId: number): Observable<Blob> {
    return this.httpClient
      .get(`${this.baseUrl}/${attachmentId}`, {
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          return new Blob([response], { type: 'application/pdf' })
        }),
        catchError(this.handleError)
      )
  }

  uploadAttachment(projectId: string, file: File, description?: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const data = new FormData()
      data.append('files', file)
      data.append('description', description)
      this.uploadProgressSubject$.next({
        percentage: 0,
        status: AttachmentUploadStatus.IN_PROGRESS,
      })
      return this.httpClient
        .post(`${this.baseUrl}/attachment/${projectId}`, data, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const { loaded, total } = event
            this.uploadProgressSubject$.next({
              percentage: total ? Math.round((loaded * 100) / total) : 0,
              status: AttachmentUploadStatus.IN_PROGRESS,
            })
          } else if (event.type === HttpEventType.Response) {
            this.uploadProgressSubject$.next({
              percentage: 100,
              status: AttachmentUploadStatus.DONE,
            })
            subscriber.next(true)
            subscriber.complete()
          } else {
            this.uploadProgressSubject$.next({
              percentage: 0,
              status: AttachmentUploadStatus.ERROR,
            })
            subscriber.next(false)
            subscriber.complete()
          }
        })
    })
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error)
  }
}
