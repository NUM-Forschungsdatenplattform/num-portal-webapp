/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Params, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { of, Subscription } from 'rxjs'
import { catchError, take, tap } from 'rxjs/operators'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { sortProjects } from 'src/app/core/utils/sort.utils'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'
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
  }

  displayedColumns: ProjectTableColumns[] = ['menu', 'name', 'author', 'organization', 'status']

  menuItems: IItemVisibility[] = []
  filterConfig: IProjectFilter
  roles: string[] = []
  user: IUserProfile

  private paginator: MatPaginator
  private sort: MatSort

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms
    this.setDataSourceAttributes()
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp
    this.setDataSourceAttributes()
  }

  setDataSourceAttributes() {
    this.dataSource.sortData = (data, matSort) => sortProjects(data, matSort, this.translateService)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.projectService.filterConfigObservable$
        .pipe(take(1))
        .subscribe((config) => (this.filterConfig = config))
    )

    this.subscriptions.add(
      this.projectService.filteredProjectsObservable$.subscribe((projects) =>
        this.handleData(projects)
      )
    )

    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => this.handleUserInfo(user))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(projects: IProjectApi[]): void {
    this.dataSource.data = projects
  }

  handleUserInfo(user: IUserProfile): void {
    this.roles = user.roles
    this.user = user
    this.generateMenuForRole()
  }

  handleSearchChange(): void {
    this.projectService.setFilter(this.filterConfig)
  }

  handleFilterChange(): void {
    this.projectService.setFilter(this.filterConfig)
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
          .subscribe()
      }
    })
  }
}
