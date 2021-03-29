import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import {
  CLOSE_PROJECT_DIALOG_CONFIG,
  PUBLISH_PROJECT_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, ProjectMenuKeys } from './menu-items'

@Component({
  selector: 'num-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private authService: AuthService
  ) {}

  displayedColumns: string[] = ['menu', 'name', 'author', 'organisation', 'status']
  dataSource = new MatTableDataSource()

  menuItems: IItemVisibility[] = []
  roles: string[] = []
  userId: string

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
      this.projectService.projectsObservable$.subscribe((projects) => this.handleData(projects))
    )
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(projects: IProjectApi[]): void {
    this.dataSource.data = projects
  }

  handleUserInfo(userInfo: IAuthUserInfo): void {
    this.roles = userInfo.groups
    this.userId = userInfo.sub
    this.generateMenuForRole()
  }

  generateMenuForRole(): void {
    let menu = [MENU_ITEM_PREVIEW]
    if (this.roles?.includes(AvailableRoles.ProjectCoordinator)) {
      menu = [...menu, ...COORDINATOR_MENU]
    }

    if (this.roles?.includes(AvailableRoles.ProjectApprover)) {
      menu = [...menu, ...APPROVER_MENU]
    }

    this.menuItems = menu
  }

  handleMenuClick(key: string, id: number): void {
    let queryParams: Params
    switch (key) {
      case ProjectMenuKeys.Edit:
      case ProjectMenuKeys.Preview:
      case ProjectMenuKeys.Review:
        queryParams = { mode: key.toLocaleLowerCase() }
        this.router.navigate(['projects', id, 'editor'], { queryParams })
        break

      case ProjectMenuKeys.Edit_researchers:
        queryParams = { mode: ProjectMenuKeys.Edit.toLocaleLowerCase() }
        this.router.navigate(['projects', id, 'editor'], { queryParams })
        break

      case ProjectMenuKeys.Withdraw_approval:
        this.handleWithDialog(WITHDRAW_APPROVAL_DIALOG_CONFIG, ProjectStatus.Draft, id)
        break

      case ProjectMenuKeys.Close:
        this.handleWithDialog(CLOSE_PROJECT_DIALOG_CONFIG, ProjectStatus.Closed, id)
        break

      case ProjectMenuKeys.Publish:
        this.handleWithDialog(PUBLISH_PROJECT_DIALOG_CONFIG, ProjectStatus.Published, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, newStatus: ProjectStatus, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.projectService.updateStatusById(id, newStatus).subscribe()
      }
    })
  }
}
