import { Component, OnDestroy, OnInit } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { Subscription } from 'rxjs'
import { Sort } from '@angular/material/sort'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { UnapprovedUsersTableColumn } from 'src/app/shared/models/user/unapproved-table-column.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'

@Component({
  selector: 'num-unapproved-users-table',
  templateUrl: './unapproved-users-table.component.html',
  styleUrls: ['./unapproved-users-table.component.scss'],
})
export class UnapprovedUsersTableComponent
  extends SortableTable<IUser>
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription()
  constructor(
    private adminService: AdminService,
    private dialogService: DialogService
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

  public sortBy: string
  public sortDir: string

  public pageIndex: number
  public totalItems: number

  public filters: any

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.pageIndex = 0
    this.filters = {
      approved: false,
    }

    this.sortBy = 'firstName'
    this.sortDir = 'ASC'

    this.getAll()
  }

  getAll() {
    this.subscriptions.add(
      this.adminService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy, this.filters)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()

    if (this.sortBy === 'createdTimestamp') {
      this.sortBy = 'registrationDate'
    }

    this.getAll()
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(users: any): void {
    this.dataSource.data = users.content
    this.totalItems = users.totalElements
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
    this.subscriptions.add(
      this.dialogService
        .openDialog(dialogConfig)
        .afterClosed()
        .subscribe(() => {
          this.getAll()
        })
    )
  }
}
