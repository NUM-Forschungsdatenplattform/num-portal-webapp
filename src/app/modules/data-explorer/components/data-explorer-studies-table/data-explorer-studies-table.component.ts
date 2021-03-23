import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { StudyService } from 'src/app/core/services/study/study.service'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

@Component({
  selector: 'num-data-explorer-studies-table',
  templateUrl: './data-explorer-studies-table.component.html',
  styleUrls: ['./data-explorer-studies-table.component.scss'],
})
export class DataExplorerStudiesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private studyService: StudyService, private router: Router) {}

  displayedColumns: string[] = [
    'icon',
    'title',
    'coordinatorName',
    'coordinatorOrganization',
    'createDate',
  ]
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.studyService.myPublishedStudiesObservable$.subscribe((studies) => {
        this.handleData(studies)
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(studies: IStudyApi[]): void {
    this.dataSource.data = studies
  }

  handleSelectClick(id: number): void {
    this.router.navigate(['data-explorer/studies', id])
  }
}
