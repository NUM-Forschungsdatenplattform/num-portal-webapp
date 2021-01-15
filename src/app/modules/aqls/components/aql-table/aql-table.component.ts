import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql.service'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { take } from 'rxjs/operators'
import { MatTableDataSource } from '@angular/material/table'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { Subscription } from 'rxjs'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'num-aql-table',
  templateUrl: './aql-table.component.html',
  styleUrls: ['./aql-table.component.scss'],
})
export class AqlTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private aqlService: AqlService) {
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  displayedColumns: string[] = ['name', 'author', 'organisation']
  dataSource = new MatTableDataSource()
  filterConfig: IAqlFilter
  selected = 'ALL_AQLS'

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.aqlService.aqlsObservable$.subscribe((aqls) => this.handleData(aqls))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleData(aqls: IAqlApi[]): void {
    this.dataSource.data = aqls
  }
}
