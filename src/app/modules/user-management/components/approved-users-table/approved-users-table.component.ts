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
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { Subscription } from 'rxjs'
import { Sort } from '@angular/material/sort'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { ApprovedUsersTableColumn } from 'src/app/shared/models/user/approved-table-column.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { forEach } from 'lodash'

@Component({
  selector: 'num-approved-users-table',
  templateUrl: './approved-users-table.component.html',
  styleUrls: ['./approved-users-table.component.scss'],
})
export class ApprovedUsersTableComponent extends SortableTable<IUser> implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  availableRoles = Object.values(AvailableRoles)

  constructor(private adminService: AdminService, private dialogService: DialogService) {
    super()
  }

  displayedColumns: ApprovedUsersTableColumn[] = [
    'icon',
    'firstName',
    'lastName',
    'organization',
    'roles',
    'createdTimestamp',
    'active',
  ]

  public sortBy: string
  public sortDir: string

  public pageIndex: number
  public totalItems: number

  public filters: any

  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize: number) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.pageIndex = 0
    this.filters = {
      approved: true,
      search: null,
      type: null,
      enabled: true,
    }

    this.sortBy = 'firstName'
    this.sortDir = 'ASC'
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
      this.adminService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy, this.filters)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()

    if (this.sortBy === 'createdTimestamp') {
      this.sortBy = 'registrationDate'
    }

    this.getAll()
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  handleData(users: any): void {
    this.dataSource.data = users.content
    this.totalItems = users.totalElements
  }

  initSearchAndFilters(filter, search) {
    let selectedTab = ''
    filter.filterItem.forEach((filterItem) => {
      if (filterItem.isSelected) {
        selectedTab = filterItem.title
      }
    })
    this.handleFilterChange(null, selectedTab, true)
    this.handleSearchChange(search, true)

    this.getAll(true)
  }

  handleSearchChange(searchText: any, noGet = false): void {
    if (typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }
    if (searchText === '') {
      this.filters.search = null
    } else {
      this.filters.search = searchText
    }

    if (!noGet) {
      this.getAll()
    }
  }

  handleFilterChange(isOrg: any, selectedTab: any, noGet = false): void {
    if (selectedTab.includes('ORGANIZATION')) {
      this.filters.type = 'ORGANIZATION'
      this.filters.enabled = null
    } else if (selectedTab.includes('ALL')) {
      this.filters.type = null
      this.filters.enabled = null
    } else if (selectedTab.includes('INACTIVE')) {
      this.filters.type = null
      this.filters.enabled = false
    } else if (selectedTab.includes('ACTIVE')) {
      this.filters.type = null
      this.filters.enabled = true
    }

    if (!noGet) {
      this.getAll(true)
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

    const currentDialog: MatDialogRef<any> = this.dialogService.openDialog(dialogConfig)
    currentDialog.afterClosed().subscribe(() => {
      this.getAll()
    })
  }
}
