import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { IAqlExecutionColumn } from 'src/app/shared/models/aql/execution/aql-execution-column.interface'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'
import { DataRequestStatus } from 'src/app/shared/models/data-request-status.enum'

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

  possibleStatus = DataRequestStatus

  @Input() resultSet: IAqlExecutionResponse
  @Input() configuration: DataExplorerConfigurations

  private dataRequestStatusValue: DataRequestStatus
  @Input() set dataRequestStatus(value: DataRequestStatus) {
    this.dataRequestStatusValue = value
    if (value === DataRequestStatus.Requested) {
      this.handleData()
    }
  }
  get dataRequestStatus(): DataRequestStatus {
    return this.dataRequestStatusValue
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
