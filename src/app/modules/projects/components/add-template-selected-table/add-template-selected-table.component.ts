/**
 * Copyright 2021 Vitagroup AG
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
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'

@Component({
  selector: 'num-add-template-selected-table',
  templateUrl: './add-template-selected-table.component.html',
  styleUrls: ['./add-template-selected-table.component.scss'],
})
export class AddTemplateSelectedTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() isDisabled: boolean
  @Input() selectedTemplates: IProjectTemplateInfoApi[]
  @Output() selectedTemplatesChange = new EventEmitter<IProjectTemplateInfoApi[]>()

  dataSource = new MatTableDataSource<IProjectTemplateInfoApi>()
  hasData = false

  constructor() {}
  displayedColumns: string[] = ['name', 'icon']
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.selectedTemplates || []
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedTemplates': {
            const changedData = changes[propName].currentValue as IProjectTemplateInfoApi[]
            this.hasData = changedData?.length > 0
            this.dataSource.data = changedData
          }
        }
      }
    }
  }

  handleRowClick(row: IProjectTemplateInfoApi): void {
    const data = this.dataSource.data.filter((template) => template.templateId !== row.templateId)
    this.selectedTemplatesChange.emit(data)
  }
}
