import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'

@Component({
  selector: 'num-approved-users-table',
  templateUrl: './approved-users-table.component.html',
  styleUrls: ['./approved-users-table.component.scss'],
})
export class ApprovedUsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()

  availableRoles = Object.values(AvailableRoles)

  constructor(private adminService: AdminService, private dialogService: DialogService) {}

  displayedColumns: string[] = [
    'icon',
    'firstName',
    'lastName',
    'organization',
    'roles',
    'createdTimestamp',
  ]
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.adminService.filteredApprovedUsersObservable$.subscribe((users) =>
        this.handleData(users)
      )
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(users: IUser[]): void {
    this.dataSource.data = users
  }

  handleSelectClick(user: IUser): void {
    const dialogContentPayload: IUser = user
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogEditUserDetailsComponent,
      dialogContentPayload,
    }

    this.dialogService.openDialog(dialogConfig)
  }
}
