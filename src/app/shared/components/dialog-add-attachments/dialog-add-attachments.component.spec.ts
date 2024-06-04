import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AttachmentUploadStatus } from '../../models/attachment/attachment-upload-status.enum'
import { DialogConfig } from '../../models/dialog/dialog-config.interface'
import { DialogSize } from '../../models/dialog/dialog-size.enum'
import { IToastMessageConfig } from '../../models/toast-message-config.interface'
import { ToastMessageType } from '../../models/toast-message-type.enum'

import { DialogAddAttachmentsComponent, UploadDialogData } from './dialog-add-attachments.component'

describe('DialogAddAttachmentsComponent', () => {
  let component: DialogAddAttachmentsComponent
  let fixture: ComponentFixture<DialogAddAttachmentsComponent>

  const dialogStubData = {
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Save',
    dialogContentComponent: DialogAddAttachmentsComponent,
    dialogContentPayload: {
      projectId: 123,
    } as UploadDialogData,
    dialogSize: DialogSize.Medium,
    title: 'Add attachment',
  } as DialogConfig

  const uploadProgressSubject$ = new BehaviorSubject<AttachmentUploadStatus>(
    AttachmentUploadStatus.IDLE
  )

  const attachmentMockService = {
    uploadAttachment: jest.fn(),
    uploadProgressObservable$: uploadProgressSubject$.asObservable(),
  } as unknown as AttachmentService

  const toastMockService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddAttachmentsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogStubData,
        },
        {
          provide: AttachmentService,
          useValue: attachmentMockService,
        },
        {
          provide: ToastMessageService,
          useValue: toastMockService,
        },
      ],
      imports: [
        CommonModule,
        FontAwesomeTestingModule,
        MatInputModule,
        MatProgressBarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogAddAttachmentsComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should patch the file name value on file selection', () => {
    const fileInput = fixture.debugElement.query(By.css('input[type="file"]'))
    const event = {
      target: {
        files: {
          item: () => new File(['test content'], 'my-test-file.pdf'),
        } as unknown as FileList,
      } as unknown as HTMLInputElement,
    } as unknown as InputEvent
    fileInput.triggerEventHandler('change', event)
    fixture.detectChanges()
    expect(component.formGroup.get('fileName').value).toEqual('my-test-file.pdf')
  })

  it('should reset the form on dialog cancel', () => {
    component.closeDialog.emit = jest.fn()
    jest.spyOn(component.closeDialog, 'emit')

    component.formGroup.patchValue({
      description: 'my test description',
      fileName: 'my-file-name.pdf',
    })

    component.handleDialogCancel()
    expect(component.formGroup.getRawValue()).toEqual({ description: '', fileName: '' })
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  describe('when confirming the dialog', () => {
    beforeEach(() => {
      component.closeDialog.emit = jest.fn()
      jest.spyOn(component.closeDialog, 'emit')
      component.dialogInput = { projectId: 123 }
    })

    it('should not do anything on submit if file name has not been provided', () => {
      component.formGroup.patchValue({
        description: 'my test description',
        fileName: '',
      })

      component.handleDialogConfirm()
      expect(component.closeDialog.emit).not.toHaveBeenCalled()
    })

    it('should call the attachment upload service', () => {
      const file = new File(['content of success file 1'], 'test-success-1.pdf')
      component.formGroup.patchValue({
        description: 'test successful form values',
        fileName: 'test-success-1.pdf',
      })
      component.file = file

      jest.spyOn(attachmentMockService, 'uploadAttachment').mockImplementation(() => of(true))

      component.handleDialogConfirm()

      expect(attachmentMockService.uploadAttachment).toHaveBeenCalledWith(
        123,
        file,
        'test successful form values'
      )
    })

    it('should reset the form and emit file data to parent component', () => {
      const file = new File(['content of success file 2'], 'test-success-2.pdf')
      component.formGroup.patchValue({
        description: 'test successful form values',
        fileName: 'test-success-2.pdf',
      })
      component.file = file

      jest.spyOn(attachmentMockService, 'uploadAttachment').mockImplementation(() => of(true))

      component.handleDialogConfirm()

      expect(component.formGroup.getRawValue()).toEqual({ description: '', fileName: '' })
      expect(component.closeDialog.emit).toHaveBeenCalledWith({
        description: 'test successful form values',
        file: file,
      })
    })

    test.each<{ message: string; status: number; translation: string }>([
      {
        message: 'Invalid file. Missing content',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_FILE_EMPTY',
      },
      {
        message: 'Document type mismatch.',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_WRONG_TYPE',
      },
      {
        message: 'PDF File Size Exceeded.',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_FILE_TOO_LARGE',
      },
      {
        message: 'PDF Files are not attached',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_NO_FILES_ATTACHED',
      },
      {
        message: 'Attachment limit reached.',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_FILE_LIMIT_REACHED',
      },
      {
        message: 'Wrong project status',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_WRONG_PROJECT_STATUS',
      },
      {
        message: 'Description is too long.',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_DESCRIPTION_TOO_LONG',
      },
      {
        message: 'Something other happened in validation.',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_VALIDATION_UNKNOWN',
      },
      {
        message: 'File rejected',
        status: 400,
        translation: 'PROJECT.ATTACHMENT.ERROR_VIRUS_SCAN_REJECTED',
      },
      {
        message: 'PDF File Size Exceeded.',
        status: 413,
        translation: 'PROJECT.ATTACHMENT.ERROR_FILE_TOO_LARGE',
      },
      {
        message: 'Internal server error occurred',
        status: 500,
        translation: 'PROJECT.ATTACHMENT.ERROR_HTTP_OTHER',
      },
    ])(
      'should open toast with correct message for $status and "$message"',
      ({ message, status, translation }) => {
        const file = new File(['Content of validation error file'], 'test-validation-error.pdf')
        component.formGroup.patchValue({
          description: 'Test file upload validation errors',
          fileName: 'test-validation-error.pdf',
        })
        component.file = file

        jest.spyOn(attachmentMockService, 'uploadAttachment').mockImplementation(() =>
          throwError(
            () =>
              new HttpErrorResponse({
                error: JSON.stringify({ message }),
                status,
              })
          )
        )

        jest.spyOn(toastMockService, 'openToast')

        component.handleDialogConfirm()

        expect(toastMockService.openToast).toHaveBeenCalledWith<IToastMessageConfig[]>({
          message: translation,
          type: ToastMessageType.Error,
        })
      }
    )

    it('should show toast message for unknown errors', () => {
      const file = new File(['Content of error test file'], 'test-unknown-error.pdf')
      component.formGroup.patchValue({
        description: 'Test file upload unknown error',
        fileName: 'test-unknown-error.pdf',
      })
      component.file = file
      jest
        .spyOn(attachmentMockService, 'uploadAttachment')
        .mockImplementation(() =>
          throwError(() => new Error('Something prevents us from sending a message.'))
        )

      jest.spyOn(toastMockService, 'openToast')

      component.handleDialogConfirm()

      expect(toastMockService.openToast).toHaveBeenCalledWith<IToastMessageConfig[]>({
        message: 'PROJECT.ATTACHMENT.ERROR_UNKNOWN',
        type: ToastMessageType.Error,
      })
    })
  })
})
