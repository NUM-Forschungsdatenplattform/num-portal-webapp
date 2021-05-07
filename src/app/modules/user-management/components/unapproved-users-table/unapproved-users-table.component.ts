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
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { filter, withLatestFrom } from 'rxjs/operators'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { UnapprovedUsersTableColumn } from 'src/app/shared/models/user/unapproved-table-column.interface'
import {
  compareIds,
  compareLocaleStringValues,
  compareTimestamps,
} from 'src/app/core/utils/sort.utils'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'

@Component({
  selector: 'num-unapproved-users-table',
  templateUrl: './unapproved-users-table.component.html',
  styleUrls: ['./unapproved-users-table.component.scss'],
})
export class UnapprovedUsersTableComponent
  extends SortableTable<IUser>
  implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(
    private adminService: AdminService,
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {
    super()
  }

  displayedColumns: UnapprovedUsersTableColumn[] = [
    'icon',
    'firstName',
    'lastName',
    'email',
    'createdTimestamp',
  ]

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
      this.adminService.unapprovedUsersObservable$
        .pipe(
          withLatestFrom(
            this.profileService.userProfileObservable$.pipe(filter((profile) => !!profile.id))
          )
        )
        .subscribe(([users, userProfile]) => {
          this.handleData(users, userProfile)
        })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sortData = (data, sort) => this.sortUsers(data, sort)
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
      isApproval: true,
    }
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogEditUserDetailsComponent,
      dialogContentPayload,
    }

    this.dialogService.openDialog(dialogConfig)
  }

  sortUsers(users: IUser[], sort: MatSort): IUser[] {
    const isAsc = sort.direction === 'asc'
    const newData = [...users]

    switch (sort.active as UnapprovedUsersTableColumn) {
      case 'createdTimestamp': {
        return newData.sort((a, b) =>
          compareTimestamps(a.createdTimestamp, b.createdTimestamp, a.id, b.id, isAsc)
        )
      }
      case 'email': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.email, b.email, a.id, b.id, isAsc)
        )
      }
      case 'firstName': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.firstName, b.firstName, a.id, b.id, isAsc)
        )
      }
      case 'lastName': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.lastName, b.lastName, a.id, b.id, isAsc)
        )
      }
      default: {
        return newData.sort((a, b) => compareIds(a.id, b.id, isAsc))
      }
    }
  }
}
