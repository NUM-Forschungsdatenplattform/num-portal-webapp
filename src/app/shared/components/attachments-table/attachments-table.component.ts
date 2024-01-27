/**
 * Copyright 2023 Vitagroup AG
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
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { SortableTable } from '../../models/sortable-table.model'
import { MatSort } from '@angular/material/sort'
import { SelectionModel } from '@angular/cdk/collections'
import { Subject, takeUntil } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { downloadPdf } from 'src/app/core/utils/download-file.utils'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { HttpErrorResponse } from '@angular/common/http'
import { ToastMessageType } from '../../models/toast-message-type.enum'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-attachments-table',
  templateUrl: './attachments-table.component.html',
  styleUrls: ['./attachments-table.component.scss'],
})
export class AttachmentsTableComponent
  extends SortableTable<ProjectAttachmentUiModel>
  implements OnDestroy, OnInit
{
  @Input()
  set attachments(attachments: ProjectAttachmentUiModel[]) {
    this.dataSource.data = attachments
  }
  @Input()
  set viewMode(mode: boolean) {
    if (!mode) {
      this.displayedColumns.unshift('select')
    }
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }
  displayedColumns: (keyof ProjectAttachmentUiModel | 'select')[] = [
    'name',
    'description',
    'uploadDate',
  ]
  isDownloadButtonDisabled = true

  selection: SelectionModel<ProjectAttachmentUiModel>

  private onDestroy$ = new Subject<void>()

  constructor(
    private attachmentService: AttachmentService,
    private toastMessageService: ToastMessageService,
    private translateService: TranslateService
  ) {
    super()
    this.selection = new SelectionModel<ProjectAttachmentUiModel>(true, [])
  }

  ngOnInit(): void {
    this.selection.changed.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.handleSelectionChange()
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.unsubscribe()
  }

  /**
   * Checks whether all attachment elements from table have been selected by checking the count of
   * total selected rows and the total count of rows.
   *
   * @returns true if all attachments have been selected false otherwise
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  /**
   * If all attachments have been selected this method will deselect all of them. In all other
   * cases all elements will be selected.
   */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource.data)
    this.isDownloadButtonDisabled = this.selection.selected.length < 1
  }

  handleSelectionChange(): void {
    this.isDownloadButtonDisabled = (this.selection?.selected?.length ?? 0) < 1
  }

  handleDownloadClick(): void {
    if ((this.selection?.selected?.length ?? 0) < 1) {
      return
    } else {
      for (const selected of this.selection.selected) {
        this.downloadFile(selected)
      }
    }
  }

  private downloadFile(attachment: ProjectAttachmentUiModel): void {
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
                message: this.translateService.instant('PROJECT.ATTACHMENT.ERROR_FILE_NOT_FOUND', {
                  fileName: attachment.name,
                }),
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
