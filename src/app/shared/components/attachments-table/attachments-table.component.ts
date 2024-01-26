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

  constructor() {
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
      for (const { name } of this.selection.selected) {
        this.downloadFile(name)
      }
    }
  }

  private downloadFile(fileName: string): void {
    console.log(fileName)
  }
}
