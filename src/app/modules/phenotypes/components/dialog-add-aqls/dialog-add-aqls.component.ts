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
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { take } from 'rxjs/operators'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { cloneDeep } from 'lodash-es'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'num-dialog-add-aqls',
  templateUrl: './dialog-add-aqls.component.html',
  styleUrls: ['./dialog-add-aqls.component.scss'],
})
export class DialogAddAqlsComponent
  implements OnInit, AfterViewInit, OnDestroy, IGenericDialog<AqlUiModel[]> {
  dialogInput: AqlUiModel[] = []

  dataSource = new MatTableDataSource<IAqlApi>()

  selectedAqls: (IAqlApi | AqlUiModel)[] = []
  filterConfig: IAqlFilter
  idOfHighlightedRow: number

  columnPaths = [['name'], ['select']]
  columnKeys = ['name', 'isSelected']

  preview: IDefinitionList[] = []

  @Output() closeDialog = new EventEmitter()
  @ViewChild(MatPaginator) paginator: MatPaginator

  private subscriptions = new Subscription()

  constructor(private aqlService: AqlService) {
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.subscriptions.add(this.aqlService.getAll().subscribe())

    this.subscriptions.add(
      this.aqlService.filteredAqlsObservable$.subscribe((aqls) => {
        this.handleFilteredData(aqls)
      })
    )

    this.handleDilaogInput()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleFilteredData(aqls: IAqlApi[]): void {
    this.generatePreviewData(aqls && aqls.length > 0 ? aqls[0] : null)
    this.dataSource.data = aqls
  }

  generatePreviewData(aql: IAqlApi): void {
    this.idOfHighlightedRow = aql?.id || null
    this.preview = aql
      ? [
          {
            title: 'FORM.AUTHOR',
            description: aql.owner?.lastName
              ? aql.owner?.firstName + ' ' + aql.owner?.lastName
              : '-',
          },
          { title: 'FORM.PURPOSE', description: aql.purpose },
          { title: 'FORM.USE', description: aql.use },
        ]
      : []
  }

  handleDilaogInput(): void {
    this.selectedAqls = cloneDeep(this.dialogInput)
  }

  handlePreviewClick(aqlRow: IAqlApi): void {
    this.generatePreviewData(aqlRow)
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.selectedAqls = this.selectedAqls.map((aql) => {
      if (aql instanceof AqlUiModel) {
        return aql
      }
      return new AqlUiModel(aql)
    })
    this.closeDialog.emit(this.selectedAqls)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
