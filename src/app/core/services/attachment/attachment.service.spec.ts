import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { firstValueFrom, of, throwError } from 'rxjs'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AttachmentUploadProgress } from 'src/app/shared/models/attachment/attachment-upload-progress.interface'
import { AttachmentUploadStatus } from 'src/app/shared/models/attachment/attachment-upload-status.enum'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'
import { attachmentContentMock1 } from 'src/mocks/data-mocks/attachment.mock'
import {
  attachmentApiMock1,
  attachmentApiMock2,
} from 'src/mocks/data-mocks/project-attachment.mock'

import { AttachmentService } from './attachment.service'

describe('AttachmentService', () => {
  let service: AttachmentService

  const appConfigMockService = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService

  const httpMockClient = {
    get: jest.fn(),
    post: jest.fn(),
  } as unknown as HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: appConfigMockService,
        },
        {
          provide: HttpClient,
          useValue: httpMockClient,
        },
      ],
    })
    service = TestBed.inject(AttachmentService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When loading all project attachments', () => {
    beforeEach(() => {
      jest
        .spyOn(httpMockClient, 'get')
        .mockReturnValue(of([attachmentApiMock1, attachmentApiMock2]))
    })

    it('should emit a new list of ui model attachments', (done) => {
      service.attachmentsObservable$.subscribe((attachments) => {
        expect(attachments).toHaveLength(2)
        for (const attachment of attachments) {
          expect(attachment).toBeInstanceOf(ProjectAttachmentUiModel)
        }
        done()
      })

      service.loadAttachments(124).subscribe()
    })
  })

  describe('When downloading an attachment', () => {
    it('should return a blob representation of the file returned by backend', (done) => {
      jest.spyOn(httpMockClient, 'get').mockImplementation(() =>
        of(
          new HttpResponse({
            body: attachmentContentMock1,
            headers: new HttpHeaders({ 'content-disposition': 'attachment;filename=test.pdf' }),
            status: 200,
          })
        )
      )

      service.downloadAttachment(123).subscribe((fileBlob) => {
        expect(fileBlob).toBeInstanceOf(Blob)
        expect(fileBlob.type).toEqual('application/pdf')
        done()
      })
    })

    it('should throw error responses', async () => {
      const fileId = 234
      const notFoundResponse = new HttpErrorResponse({
        error: `File with id ${fileId} not found`,
        status: 404,
        statusText: 'NOT FOUND',
      })
      jest.spyOn(httpMockClient, 'get').mockImplementation(() => of(notFoundResponse))
      jest.spyOn(service, 'handleError')

      try {
        await firstValueFrom(service.downloadAttachment(fileId))
      } catch (error) {
        expect(service.handleError).toHaveBeenCalled()
      }
    })
    it('should handle unexpected errors', async () => {
      const expectedError = new Error('Something unexpected happened.')
      jest.spyOn(httpMockClient, 'get').mockImplementation(() => {
        throw expectedError
      })

      try {
        await firstValueFrom(service.downloadAttachment(345))
      } catch (error) {
        expect(error).toEqual(expectedError)
      }
    })
  })

  describe('When uploading attachments', () => {
    it('should report the progress on progress event response', (done) => {
      jest.spyOn(httpMockClient, 'post').mockImplementation(() =>
        of({
          loaded: 10,
          total: 100,
          type: HttpEventType.UploadProgress,
        } as HttpEvent<HttpEventType.UploadProgress>)
      )

      let processUpdatesOccurred = 0
      const expectedProgress: AttachmentUploadProgress[] = [
        {
          percentage: 0,
          status: AttachmentUploadStatus.IDLE,
        },
        {
          percentage: 0,
          status: AttachmentUploadStatus.IN_PROGRESS,
        },
        {
          percentage: 10,
          status: AttachmentUploadStatus.IN_PROGRESS,
        },
      ]
      service.uploadProgressObservable$.subscribe((progress) => {
        expect(progress).toEqual(expectedProgress[processUpdatesOccurred])
        processUpdatesOccurred++

        if (processUpdatesOccurred >= expectedProgress.length) {
          done()
        }
      })

      service
        .uploadAttachment(1, new File([attachmentContentMock1], 'test'), 'A test file')
        .subscribe(() => {})
    })

    it('should return 0 if total is not returned', (done) => {
      jest.spyOn(httpMockClient, 'post').mockReturnValue(
        of({
          loaded: 50,
          type: HttpEventType.UploadProgress,
        } as HttpEvent<HttpEventType.UploadProgress>)
      )
      let processUpdatesOccurred = 0
      const expectedProgress: AttachmentUploadProgress[] = [
        {
          percentage: 0,
          status: AttachmentUploadStatus.IDLE,
        },
        {
          percentage: 0,
          status: AttachmentUploadStatus.IN_PROGRESS,
        },
        {
          percentage: 0,
          status: AttachmentUploadStatus.IN_PROGRESS,
        },
      ]
      service.uploadProgressObservable$.subscribe((progress) => {
        expect(progress).toEqual(expectedProgress[processUpdatesOccurred])
        processUpdatesOccurred++

        if (processUpdatesOccurred >= expectedProgress.length) {
          done()
        }
      })

      service
        .uploadAttachment(1, new File([attachmentContentMock1], 'test'), 'A test file')
        .subscribe(() => {})
    })

    it('should complete after response has been received', async () => {
      jest.spyOn(httpMockClient, 'post').mockReturnValue(of(new HttpResponse({ status: 200 })))
      await firstValueFrom(
        service.uploadAttachment(2, new File([attachmentContentMock1], 'test'), 'Another test file')
      )
      const lastProgress = await firstValueFrom(service.uploadProgressObservable$)
      expect(lastProgress).toEqual({
        percentage: 100,
        status: AttachmentUploadStatus.DONE,
      } as AttachmentUploadProgress)
    })

    it('should set progress to error on http error response', async () => {
      jest
        .spyOn(httpMockClient, 'post')
        .mockReturnValue(throwError(() => new HttpErrorResponse({ status: 404 })))
      try {
        await firstValueFrom(
          service.uploadAttachment(
            3,
            new File([attachmentContentMock1], 'test3'),
            'Third test file'
          )
        )
      } catch {
        const lastProgress = await firstValueFrom(service.uploadProgressObservable$)
        expect(lastProgress).toEqual({
          percentage: 0,
          status: AttachmentUploadStatus.ERROR,
        } as AttachmentUploadProgress)
      }
    })

    it('should throw all other errors', async () => {
      jest.spyOn(httpMockClient, 'post').mockImplementation(() => {
        throw new Error('unknown error occurred')
      })
      try {
        await firstValueFrom(
          service.uploadAttachment(
            4,
            new File([attachmentContentMock1], 'test_error'),
            'A file producing an error'
          )
        )
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
