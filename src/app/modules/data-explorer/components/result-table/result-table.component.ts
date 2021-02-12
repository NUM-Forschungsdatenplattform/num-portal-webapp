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
  resultSetColumns: IAqlExecutionColumn[] = []
  dataSource = new MatTableDataSource()

  @Input() resultSet: IAqlExecutionResponse
  @Input() configuration: DataExplorerConfigurations

  private isLoading: boolean
  @Input() set isDataSetLoading(isLoading: boolean) {
    this.isLoading = isLoading
    if (!this.isLoading && this.resultSet?.rows.length) {
      this.handleData()
    }
  }
  get isDataSetLoading(): boolean {
    return this.isLoading
  }

  ngOnInit(): void {}

  handleData(): void {
    const firstColumn: IAqlExecutionColumn = {
      path: ' ',
      name: '#',
    }

    this.resultSetColumns = [firstColumn, ...this.resultSet.columns]
    this.displayedColumns = this.resultSetColumns.map((column) => column.path)
    this.dataSource.data = this.resultSet.rows.map((row, index) => [index + 1, ...row])
  }
}
