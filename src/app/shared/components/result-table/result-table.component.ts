import { Component, Input, ViewChild } from '@angular/core'
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator'
import { MatSort } from '@angular/material/sort'
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table'
import { IAqlExecutionColumn } from 'src/app/shared/models/aql/execution/aql-execution-column.interface'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'

@Component({
  selector: 'num-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
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
