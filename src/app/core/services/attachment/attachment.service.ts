import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, filter, map, Observable, of, tap, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AttachmentUploadProgress } from 'src/app/shared/models/attachment/attachment-upload-progress.interface'
import { AttachmentUploadStatus } from 'src/app/shared/models/attachment/attachment-upload-status.enum'
import { IProjectAttachmentApi } from 'src/app/shared/models/project/project-attachment-api.interface'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private attachmentsSubject$ = new BehaviorSubject<ProjectAttachmentUiModel[]>([])
  public attachmentsObservable$ = this.attachmentsSubject$.asObservable()

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

  loadAttachments(projectId): Observable<void> {
    return this.httpClient
      .get<IProjectAttachmentApi[]>(`${this.baseUrl}/project/${projectId}`)
      .pipe(
        map((response) => {
          const attachments = response.map((attachment) => new ProjectAttachmentUiModel(attachment))
          this.attachmentsSubject$.next(attachments)
        })
      )
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

  uploadAttachment(projectId: number, file: File, description?: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const data = new FormData()
      data.append('files', file)
      data.append('description', description)
      this.uploadProgressSubject$.next({
        percentage: 0,
        status: AttachmentUploadStatus.IN_PROGRESS,
      })
      return this.httpClient
        .post(`${this.baseUrl}/${projectId}`, data, {
          observe: 'events',
          reportProgress: true,
          responseType: 'text' as 'json',
        })
        .pipe(
          tap((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              const { loaded, total } = event
              this.uploadProgressSubject$.next({
                percentage: total ? Math.round((loaded * 100) / total) : 0,
                status: AttachmentUploadStatus.IN_PROGRESS,
              })
            }
          }),
          filter((event) => event.type === HttpEventType.Response)
        )
        .subscribe({
          next: () => {
            this.uploadProgressSubject$.next({
              percentage: 100,
              status: AttachmentUploadStatus.DONE,
            })
            subscriber.next(true)
            subscriber.complete()
          },
          error: (error) => {
            this.uploadProgressSubject$.next({
              percentage: 0,
              status: AttachmentUploadStatus.ERROR,
            })
            subscriber.error(error)
            subscriber.complete()
          },
        })
    })
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error)
  }
}
