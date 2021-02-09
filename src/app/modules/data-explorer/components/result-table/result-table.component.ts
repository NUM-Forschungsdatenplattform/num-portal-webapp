import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IAqlExecutionColumn } from 'src/app/shared/models/aql/execution/aql-execution-column.interface'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'

@Component({
  selector: 'num-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnInit {
  private subscriptions = new Subscription()
  constructor(private aqlService: AqlService) {}

  displayedColumns: string[] = []
  resultSetColumns: IAqlExecutionColumn[] = []
  dataSource = new MatTableDataSource()
  resultSetRequested = false
  configuration: DataExplorerConfigurations = DataExplorerConfigurations.Default

  @ViewChild(MatSort, { static: false }) set sorting(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (item, property) => {
      return item[this.displayedColumns.indexOf(property)]
    }
    this.dataSource.sort = sort
  }
  @ViewChild(MatPaginator, { static: false }) set pagination(paginator: MatPaginator) {
    this.dataSource.paginator = paginator
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(resultSet: any): void {
    this.resultSetColumns = resultSet.columns
    this.dataSource.data = resultSet.rows
    this.resultSetColumns.forEach((column) => this.displayedColumns.push(column.path))
  }

  getRecords(): void {
    this.resultSetColumns = []
    this.dataSource.data = []
    this.displayedColumns = []

    this.aqlService.getResultSet().subscribe((resultSet) => {
      this.handleData(resultSet)
    })
    this.resultSetRequested = true
  }
}
