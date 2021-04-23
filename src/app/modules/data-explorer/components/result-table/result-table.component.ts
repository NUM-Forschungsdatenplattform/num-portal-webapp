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

import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { IAqlExecutionColumn } from 'src/app/shared/models/aql/execution/aql-execution-column.interface'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'

@Component({
  selector: 'num-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  constructor() {}

  @ViewChild(MatSort, { static: false }) set sorting(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (item, property) => {
      return item[this.displayedColumns.indexOf(property)]
    }
    this.dataSource.sort = sort
  }
  @ViewChild(MatPaginator, { static: false }) set pagination(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  displayedColumns: string[] = []
  displayedColumnNames: string[] = []
  dataSource = new MatTableDataSource()

  @Input() resultSet: IAqlExecutionResponse
  @Input() index: number
  @Input() totalTables: number

  private isLoading: boolean
  @Input() set isDataSetLoading(isLoading: boolean) {
    this.isLoading = isLoading
    if (!this.isLoading && this.resultSet?.rows.length) {
      this.handleData()
    }
  }

  ngOnInit(): void {}

  handleData(): void {
    const firstColumn: IAqlExecutionColumn = {
      path: ' ',
      name: '#',
    }
    const columnNamePattern = new RegExp('([^/]+$)')
    const resultSetColumns: IAqlExecutionColumn[] = [firstColumn, ...this.resultSet.columns]

    this.displayedColumns = resultSetColumns.map((column) => column.path)
    this.displayedColumnNames = resultSetColumns.map(
      (column) => column.name.match(columnNamePattern)[0]
    )
    this.dataSource.data = this.resultSet.rows.map((row, index) => [index + 1, ...row])
  }
}
