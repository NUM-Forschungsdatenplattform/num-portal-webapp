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
import { Component, Input, ViewChild } from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { SortableTable } from '../../models/sortable-table.model'
import { MatSort } from '@angular/material/sort'
import { SelectionModel } from '@angular/cdk/collections'

@Component({
  selector: 'num-attachments-table',
  templateUrl: './attachments-table.component.html',
  styleUrls: ['./attachments-table.component.scss'],
})
export class AttachmentsTableComponent extends SortableTable<ProjectAttachmentUiModel> {
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

  selection: SelectionModel<ProjectAttachmentUiModel>

  constructor() {
    super()
    this.selection = new SelectionModel<ProjectAttachmentUiModel>(true, [])
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource.data)
  }
}
