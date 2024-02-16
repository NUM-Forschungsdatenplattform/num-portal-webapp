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
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { downloadPdf } from 'src/app/core/utils/download-file.utils'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { TranslateService } from '@ngx-translate/core'
import { HttpErrorResponse } from '@angular/common/http'
import { ToastMessageType } from '../../models/toast-message-type.enum'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogAddAttachmentsComponent } from '../dialog-add-attachments/dialog-add-attachments.component'
import { DialogSize } from '../../models/dialog/dialog-size.enum'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-attachments-table-actions',
  templateUrl: './attachments-table-actions.component.html',
  styleUrls: ['./attachments-table-actions.component.scss'],
})
export class AttachmentsTableActionsComponent implements OnChanges, OnDestroy {
  @Input() attachments: ProjectAttachmentUiModel[]
  @Input() selected: ProjectAttachmentUiModel[] = []
  @Input() showDownloadButton: boolean
  @Input() showUploadButton: boolean

  isDownloadButtonDisabled = true
  isUploadButtonDisabled = false

  private subscriptions = new Subscription()

  constructor(
    private attachmentService: AttachmentService,
    private dialogService: DialogService,
    private toastMessageService: ToastMessageService,
    private translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('selected' in changes) {
      const newSelections = changes['selected'].currentValue as ProjectAttachmentUiModel[]
      this.isDownloadButtonDisabled = (newSelections?.length ?? 0) < 1
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleDownloadClick(): void {
    if ((this.selected?.length ?? 0) < 1) {
      return
    } else {
      for (const selected of this.selected) {
        this.downloadFile(selected)
      }
    }
  }

  handleUploadClick(): void {
    const dialogRef = this.dialogService.openDialog({
      dialogContentComponent: DialogAddAttachmentsComponent,
      dialogSize: DialogSize.Medium,
      title: this.translateService.instant('PROJECT.ATTACHMENT.ADD_DIALOG_TITLE'),
      confirmButtonText: this.translateService.instant('PROJECT.ATTACHMENT.UPLOAD'),
      cancelButtonText: this.translateService.instant('BUTTON.CANCEL'),
    })

    this.subscriptions.add(
      dialogRef
        .afterClosed()
        .subscribe((saveResult: { file: File; description?: string } | undefined) => {
          if (saveResult !== undefined) {
            console.log(saveResult)
          }
        })
    )
  }

  private downloadFile(attachment: ProjectAttachmentUiModel): void {
    try {
      this.attachmentService.downloadAttachment(attachment.id).subscribe({
        next: (fileBlob) => {
          downloadPdf(attachment.name, fileBlob)
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 404:
                this.toastMessageService.openToast({
                  type: ToastMessageType.Error,
                  message: this.translateService.instant(
                    'PROJECT.ATTACHMENT.ERROR_FILE_NOT_FOUND',
                    {
                      fileName: attachment.name,
                    }
                  ),
                })
                break
              case 503:
                this.toastMessageService.openToast({
                  type: ToastMessageType.Error,
                  message: this.translateService.instant('PROJECT.ATTACHMENT.ERROR_TRY_AGAIN', {
                    fileName: attachment.name,
                  }),
                })
                break
              default:
                this.showGenericErrorToast(attachment.name)
            }
          } else {
            this.showGenericErrorToast(attachment.name)
          }
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  private showGenericErrorToast(fileName: string): void {
    this.toastMessageService.openToast({
      type: ToastMessageType.Error,
      message: this.translateService.instant('PROJECT.ATTACHMENT.ERROR_OTHER', {
        fileName: fileName,
      }),
    })
  }
}
