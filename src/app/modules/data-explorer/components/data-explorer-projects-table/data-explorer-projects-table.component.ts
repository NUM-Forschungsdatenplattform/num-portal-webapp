import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'

@Component({
  selector: 'num-data-explorer-studies-table',
  templateUrl: './data-explorer-projects-table.component.html',
  styleUrls: ['./data-explorer-projects-table.component.scss'],
})
export class DataExplorerProjectsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private projectService: ProjectService, private router: Router) {}

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
      this.projectService.myPublishedProjectsObservable$.subscribe((projects) => {
        this.handleData(projects)
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

  handleData(studies: IProjectApi[]): void {
    this.dataSource.data = studies
  }

  handleSelectClick(id: number): void {
    this.router.navigate(['data-explorer/projects', id])
  }
}
