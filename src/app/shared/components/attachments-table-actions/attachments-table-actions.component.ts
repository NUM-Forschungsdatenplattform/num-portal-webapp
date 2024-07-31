import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SecurityContext,
  SimpleChanges,
} from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { downloadPdf } from 'src/app/core/utils/download-file.utils'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { TranslateService } from '@ngx-translate/core'
import { HttpErrorResponse } from '@angular/common/http'
import { ToastMessageType } from '../../models/toast-message-type.enum'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import {
  DialogAddAttachmentsComponent,
  UploadDialogData,
} from '../dialog-add-attachments/dialog-add-attachments.component'
import { DialogSize } from '../../models/dialog/dialog-size.enum'
import { Subscription } from 'rxjs'
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog'
import { GenericDialogComponent } from 'src/app/core/components/generic-dialog/generic-dialog.component'
import {
  ConfirmationDialogInput,
  DialogConfirmationComponent,
} from '../dialog-confirmation/dialog-confirmation.component'
import { ProjectUiModel } from '../../models/project/project-ui.model'
import { ProjectStatus } from '../../models/project/project-status.enum'
import { DomSanitizer } from '@angular/platform-browser'
import { ProjectService } from 'src/app/core/services/project/project.service'

@Component({
  selector: 'num-attachments-table-actions',
  templateUrl: './attachments-table-actions.component.html',
  styleUrls: ['./attachments-table-actions.component.scss'],
})
export class AttachmentsTableActionsComponent implements OnChanges, OnDestroy {
  @Input() attachments: ProjectAttachmentUiModel[]
  @Input() project: ProjectUiModel
  @Input() selected: ProjectAttachmentUiModel[] = []
  @Input() showDeleteButton = false
  @Input() showDownloadButton: boolean = false
  @Input() showUploadButton: boolean = false

  isDeleteButtonDisabled = true
  isDownloadButtonDisabled = true
  isUploadButtonDisabled = true

  private subscriptions = new Subscription()

  constructor(
    private attachmentService: AttachmentService,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer,
    private toastMessageService: ToastMessageService,
    private translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('selected' in changes) {
      const newSelections = changes['selected'].currentValue as ProjectAttachmentUiModel[]
      this.isDownloadButtonDisabled = (newSelections?.length ?? 0) < 1
      this.isDeleteButtonDisabled = this.getDeleteButtonDisabled(this.project)
      this.showDeleteButton = this.getDeleteButtonVisible(this.project)
    }

    if ('project' in changes) {
      const project = changes['project'].currentValue as ProjectUiModel
      this.isUploadButtonDisabled = project.id === null
      this.isDeleteButtonDisabled = this.getDeleteButtonDisabled(project)
      this.showDeleteButton = this.getDeleteButtonVisible(project)
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
    const dialogRef: MatDialogRef<GenericDialogComponent> = this.dialogService.openDialog({
      dialogContentComponent: DialogAddAttachmentsComponent,
      dialogContentPayload: {
        projectId: this.project.id,
      } as UploadDialogData,
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
            this.toastMessageService.openToast({
              type: ToastMessageType.Success,
              message: this.translateService.instant('PROJECT.ATTACHMENT.UPLOAD_SUCCESS_MESSAGE', {
                fileName: saveResult.file.name,
              }),
            })

            this.attachmentService.loadAttachments(this.project.id).subscribe()
          }
        })
    )
  }

  handleDeleteClick(): void {
    const confirmDialogRef: MatDialogRef<GenericDialogComponent> = this.dialogService.openDialog({
      cancelButtonText: this.translateService.instant('BUTTON.CANCEL'),
      confirmButtonText: this.translateService.instant('PROJECT.ATTACHMENT.REMOVE'),
      dialogContentComponent: DialogConfirmationComponent,
      dialogContentPayload: {
        useHtml: true,
        text: this.translateService.instant('PROJECT.ATTACHMENT.CONFIRM_REMOVE_DIALOG_CONTENT', {
          fileNames: this.getFileNameList(this.selected.map(({ name }) => name)),
        }),
      } as ConfirmationDialogInput,
      dialogSize: DialogSize.Medium,
      title: this.translateService.instant('PROJECT.ATTACHMENT.CONFIRM_REMOVE_DIALOG_TITLE'),
    })

    this.subscriptions.add(
      confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.projectService.markAttachmentsForDelete(this.selected)
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

  private getDeleteButtonDisabled({ status }: ProjectUiModel): boolean {
    switch (status) {
      case ProjectStatus.ChangeRequest:
      case ProjectStatus.Draft: {
        return (this.selected?.length ?? 0) < 1
      }
      case ProjectStatus.Reviewing: {
        return (this.selected?.length ?? 0) < 1
      }
      default: {
        return true
      }
    }
  }

  private getDeleteButtonVisible({ status }: ProjectUiModel): boolean {
    return [ProjectStatus.ChangeRequest, ProjectStatus.Draft, ProjectStatus.Reviewing].includes(
      status
    )
  }

  private getFileNameList(fileNames: string[]): string {
    return this.sanitizer.sanitize(
      SecurityContext.HTML,
      `<ul>${fileNames.map((fileName) => `<li>${fileName}</li>`)}</ul>`
    )
  }
}
