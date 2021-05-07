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

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { filter, withLatestFrom } from 'rxjs/operators'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ApprovedUsersTableColumn } from 'src/app/shared/models/user/approved-table-column.interface'
import { sortUsers } from 'src/app/core/utils/sort.utils'

@Component({
  selector: 'num-approved-users-table',
  templateUrl: './approved-users-table.component.html',
  styleUrls: ['./approved-users-table.component.scss'],
})
export class ApprovedUsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()

  availableRoles = Object.values(AvailableRoles)

  constructor(
    private adminService: AdminService,
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {}

  displayedColumns: ApprovedUsersTableColumn[] = [
    'icon',
    'firstName',
    'lastName',
    'organization',
    'roles',
    'createdTimestamp',
  ]
  dataSource = new MatTableDataSource<IUser>()

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
      this.adminService.filteredApprovedUsersObservable$
        .pipe(
          withLatestFrom(
            this.profileService.userProfileObservable$.pipe(filter((profile) => !!profile.id))
          )
        )
        .subscribe(([users, userProfile]) => this.handleData(users, userProfile))
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sortData = (data, sort) => sortUsers(data, sort)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(users: IUser[], userProfile: IUserProfile): void {
    if (!userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
      this.dataSource.data = users.filter(
        (user) => user.organization?.id === userProfile.organization.id
      )
    } else {
      this.dataSource.data = users
    }
  }

  handleSelectClick(user: IUser): void {
    const dialogContentPayload: { user: IUser; isApproval: boolean } = {
      user,
      isApproval: false,
    }
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogEditUserDetailsComponent,
      dialogContentPayload,
    }

    this.dialogService.openDialog(dialogConfig)
  }

  handleSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.dataSource.sort.active = 'id'
      this.dataSource.sort.direction = 'desc'
    } else {
      this.dataSource.sort.active = sort.active
      this.dataSource.sort.direction = sort.direction
    }
  }
}
