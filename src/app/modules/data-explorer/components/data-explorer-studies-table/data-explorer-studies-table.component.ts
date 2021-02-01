import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

@Component({
  selector: 'num-data-explorer-studies-table',
  templateUrl: './data-explorer-studies-table.component.html',
  styleUrls: ['./data-explorer-studies-table.component.scss'],
})
export class DataExplorerStudiesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()

  constructor(
    private studyService: StudyService,
    private router: Router,
    private adminService: AdminService,
    private organizationService: OrganizationService
  ) {}

  displayedColumns: string[] = [
    'icon',
    'title',
    'coordinatorName',
    'coordinatorOrganization',
    'createDate',
  ]
  dataSource = new MatTableDataSource()

  isCoordinatorNameFetched: boolean
  isCoordinatorOrganizationFetched: boolean

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.studyService.myPublishedStudiesObservable$.subscribe((studies) => {
        this.handleData(studies)
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(studies: IStudyApi[]): void {
    this.dataSource.data = studies
    this.fetchCoordinatorName(studies)
    this.fetchCoordinatorOrganization(studies)
  }

  handleSelectClick(id: number): void {
    this.router.navigate(['data-explorer/studies', id])
  }

  fetchCoordinatorName(studies: IStudyApi[]): void {
    if (studies.length) {
      studies.forEach((study) => {
        this.adminService.getUserById(study.coordinator.userId).subscribe((user) => {
          study.coordinator['userName'] = user.firstName + ' ' + user.lastName
        })
      })
    }
  }

  fetchCoordinatorOrganization(studies: IStudyApi[]): void {
    if (studies.length) {
      studies.forEach((study) => {
        this.organizationService
          .getOrganizationById(study.coordinator.organizationId)
          .subscribe((organization) => {
            study.coordinator['organizationName'] = organization.name
          })
      })
    }
  }
}
