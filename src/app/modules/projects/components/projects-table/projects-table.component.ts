import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator'
import { Sort } from '@angular/material/sort'
import { Params, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { of, Subscription } from 'rxjs'
import { catchError, take, tap } from 'rxjs/operators'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectTableColumns } from 'src/app/shared/models/project/project-table.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import {
  ARCHIVE_PROJECT_DIALOG_CONFIG,
  CHANGE_STATUS_ERROR,
  CHANGE_STATUS_SUCCESS,
  CLOSE_PROJECT_DIALOG_CONFIG,
  DELETE_PROJECT_DIALOG_CONFIG,
  PUBLISH_PROJECT_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, ProjectMenuKeys } from './menu-items'

@Component({
  selector: 'num-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent
  extends SortableTable<IProjectApi>
  implements OnInit, OnDestroy
{
  lang = 'en'
  private subscriptions = new Subscription()
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private profileService: ProfileService,
    private toastMessageService: ToastMessageService,
    private translateService: TranslateService
  ) {
    super()
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.lang = event.lang || 'en'

        this.getAll()
      })
    )

    this.lang = this.translateService.currentLang || 'en'
  }

  displayedColumns: ProjectTableColumns[] = ['menu', 'name', 'author', 'organization', 'status']

  menuItems: IItemVisibility[] = []
  filterConfig: any
  roles: string[] = []
  user: IUserProfile

  public sortBy: string
  public sortDir: string

  public pageIndex: number

  public totalItems: number

  public filters: any

  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.pageIndex = 0
    this.filters = {
      type: null,
      search: null,
    }
    this.subscriptions.add(
      this.projectService.filterConfigObservable$.pipe(take(1)).subscribe((config) => {
        this.filterConfig = config
        this.handleFilterChange(true)
        this.handleSearchChange(true)

        this.getAll(true)
      })
    )

    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => this.handleUserInfo(user))
    )

    this.sortBy = 'name'
    this.sortDir = 'ASC'
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()
    this.getAll()
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  goToFirstPage() {
    this.paginator.firstPage()
    this.pageIndex = 0
  }

  getAll(returnFirstIndex = false) {
    if (returnFirstIndex && typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }
    this.subscriptions.add(
      this.projectService
        .getAllPag(
          this.pageIndex,
          this.pageSize,
          this.sortDir,
          this.sortBy,
          this.filters,
          this.lang
        )
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(projects: any): void {
    this.dataSource.data = projects.content
    this.totalItems = projects.totalElements
  }

  handleUserInfo(user: IUserProfile): void {
    this.roles = user.roles
    this.user = user
    this.generateMenuForRole()
  }

  handleSearchChange(noGet = false): void {
    if (typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }
    if (this.filterConfig.searchText === '') {
      this.filters.search = null
    } else {
      this.filters.search = this.filterConfig.searchText
    }

    if (!noGet) {
      this.getAll()
    }
  }

  handleFilterChange(noGet = false): void {
    for (let i = 0; i < this.filterConfig.filterItem.length; i++) {
      if (this.filterConfig.filterItem[i].isSelected) {
        switch (this.filterConfig.filterItem[i].id) {
          case 'PROJECT.ALL_PROJECTS':
            this.filters.type = null
            break
          case 'PROJECT.MY_PROJECTS':
            this.filters.type = 'OWNED'
            break
          case 'PROJECT.ORGANIZATION_PROJECTS':
            this.filters.type = 'ORGANIZATION'
            break
          case 'PROJECT.ARCHIVED_PROJECTS':
            this.filters.type = 'ARCHIVED'
            break
          default:
        }
      }
    }

    if (!noGet) {
      this.getAll(true)
    }
  }

  generateMenuForRole(): void {
    let menu = [MENU_ITEM_PREVIEW]
    if (this.roles?.includes(AvailableRoles.StudyCoordinator)) {
      menu = [...menu, ...COORDINATOR_MENU]
    }

    if (this.roles?.includes(AvailableRoles.StudyApprover)) {
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

      case ProjectMenuKeys.Archive:
        this.handleWithDialog(ARCHIVE_PROJECT_DIALOG_CONFIG, ProjectStatus.Archived, id)
        break

      case ProjectMenuKeys.Delete:
        this.handleWithDialog(DELETE_PROJECT_DIALOG_CONFIG, ProjectStatus.ToBeDeleted, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, newStatus: ProjectStatus, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.projectService
          .updateStatusById(id, newStatus)
          .pipe(
            tap(() => {
              this.toastMessageService.openToast(CHANGE_STATUS_SUCCESS)
            }),
            catchError((error) => {
              this.toastMessageService.openToast(CHANGE_STATUS_ERROR)
              return of(error)
            })
          )
          .subscribe(() => this.getAll())
      }
    })
  }
}
