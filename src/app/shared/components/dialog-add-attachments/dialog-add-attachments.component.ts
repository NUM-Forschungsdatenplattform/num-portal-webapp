import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Inject, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AttachmentUploadProgress } from '../../models/attachment/attachment-upload-progress.interface'
import { AttachmentUploadStatus } from '../../models/attachment/attachment-upload-status.enum'
import { IGenericDialog } from '../../models/generic-dialog.interface'
import { ToastMessageType } from '../../models/toast-message-type.enum'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface FileInputControl {
  fileName: FormControl<string>
  description: FormControl<string>
}

export interface UploadDialogData {
  projectId: number
}

@Component({
  selector: 'num-dialog-add-attachments',
  templateUrl: './dialog-add-attachments.component.html',
  styleUrls: ['./dialog-add-attachments.component.scss'],
})
export class DialogAddAttachmentsComponent implements IGenericDialog<UploadDialogData> {
  @Output() closeDialog = new EventEmitter<{ file: File; description?: string } | void>()

  attachmentUploadStatus = AttachmentUploadStatus
  dialogInput: UploadDialogData
  file?: File
  formGroup: FormGroup<FileInputControl>
  uploadProgress$: Observable<AttachmentUploadProgress>

  constructor(
    private attachmentService: AttachmentService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogConfig,
    private fb: FormBuilder,
    private toastService: ToastMessageService,
    private translationService: TranslateService
  ) {
    this.formGroup = this.fb.group<FileInputControl>({
      description: this.fb.nonNullable.control<string>(''),
      fileName: this.fb.nonNullable.control<string>(
        { value: '', disabled: true },
        { validators: [Validators.required] }
      ),
    })

    this.uploadProgress$ = this.attachmentService.uploadProgressObservable$
  }

  handleFileSelect(event: InputEvent): void {
    this.file = (event.target as HTMLInputElement).files.item(0)
    this.formGroup.patchValue({ fileName: this.file.name })
  }

  handleDialogCancel() {
    this.formGroup.reset()
    this.closeDialog.emit()
  }

  handleDialogConfirm() {
    if (this.formGroup.valid && this.formGroup.get('fileName').value !== '') {
      const { description } = this.formGroup.getRawValue()
      this.attachmentService
        .uploadAttachment(this.dialogInput.projectId, this.file, description)
        .subscribe({
          next: (result) => {
            if (result) {
              this.formGroup.reset()
              this.closeDialog.emit({ description, file: this.file })
            }
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              switch (error.status) {
                case 400: {
                  this.toastService.openToast({
                    message: this.translationService.instant(
                      this.getErrorMessageKey(JSON.parse(error.error).message)
                    ),
                    type: ToastMessageType.Error,
                  })
                  break
                }
                case 413: {
                  this.toastService.openToast({
                    message: this.translationService.instant(
                      'PROJECT.ATTACHMENT.ERROR_FILE_TOO_LARGE'
                    ),
                    type: ToastMessageType.Error,
                  })
                  break
                }
                default: {
                  this.toastService.openToast({
                    message: this.translationService.instant('PROJECT.ATTACHMENT.ERROR_HTTP_OTHER'),
                    type: ToastMessageType.Error,
                  })
                }
              }
            } else {
              this.toastService.openToast({
                message: this.translationService.instant('PROJECT.ATTACHMENT.ERROR_UNKNOWN'),
                type: ToastMessageType.Error,
              })
            }
          },
        })
    }
  }

  private getErrorMessageKey(errorMessage: string): string {
    if (errorMessage.startsWith('Invalid file. Missing content')) {
      return 'PROJECT.ATTACHMENT.ERROR_FILE_EMPTY'
    } else if (errorMessage.startsWith('Document type mismatch.')) {
      return 'PROJECT.ATTACHMENT.ERROR_WRONG_TYPE'
    } else if (errorMessage.startsWith('PDF File Size Exceeded.')) {
      return 'PROJECT.ATTACHMENT.ERROR_FILE_TOO_LARGE'
    } else if (errorMessage.startsWith('PDF Files are not attached')) {
      return 'PROJECT.ATTACHMENT.ERROR_NO_FILES_ATTACHED'
    } else if (errorMessage.startsWith('Attachment limit reached.')) {
      return 'PROJECT.ATTACHMENT.ERROR_FILE_LIMIT_REACHED'
    } else if (errorMessage.startsWith('Wrong project status')) {
      return 'PROJECT.ATTACHMENT.ERROR_WRONG_PROJECT_STATUS'
    } else if (errorMessage.startsWith('Description is too long.')) {
      return 'PROJECT.ATTACHMENT.ERROR_DESCRIPTION_TOO_LONG'
    } else if (errorMessage.startsWith('File rejected')) {
      return 'PROJECT.ATTACHMENT.ERROR_VIRUS_SCAN_REJECTED'
    } else {
      return 'PROJECT.ATTACHMENT.ERROR_VALIDATION_UNKNOWN'
    }
  }
}
