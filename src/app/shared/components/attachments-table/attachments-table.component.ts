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
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { SortableTable } from '../../models/sortable-table.model'
import { MatSort } from '@angular/material/sort'
import { SelectionModel } from '@angular/cdk/collections'
import { ProjectStatus } from '../../models/project/project-status.enum'

@Component({
  selector: 'num-attachments-table',
  templateUrl: './attachments-table.component.html',
  styleUrls: ['./attachments-table.component.scss'],
})
export class AttachmentsTableComponent
  extends SortableTable<ProjectAttachmentUiModel>
  implements OnChanges
{
  @Input()
  set attachments(attachments: ProjectAttachmentUiModel[]) {
    this.dataSource.data = attachments
    this.allowUpload = attachments.length < 10
  }
  @Input()
  showSelectColumn: boolean

  @Input() set projectStatus(projectStatus: ProjectStatus) {
    this.allowUpload = [ProjectStatus.Draft].includes(projectStatus)
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
  allowUpload = false

  constructor(private cd: ChangeDetectorRef) {
    super()
    this.selection = new SelectionModel<ProjectAttachmentUiModel>(true, [])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('showSelectColumn' in changes) {
      if (changes['showSelectColumn'].currentValue === true) {
        this.displayedColumns.unshift('select')
      } else if (this.displayedColumns.includes('select')) {
        this.displayedColumns.splice(this.displayedColumns.indexOf('select'), 1)
      }
      this.cd.markForCheck()
    }
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
  }
}
