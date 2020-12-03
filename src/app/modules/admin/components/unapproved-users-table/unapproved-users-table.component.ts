import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog.service'
import { DialogAddUserDetailsComponent } from '../dialog-add-user-details/dialog-add-user-details.component'

@Component({
  selector: 'num-unapproved-users-table',
  templateUrl: './unapproved-users-table.component.html',
  styleUrls: ['./unapproved-users-table.component.scss'],
})
export class UnapprovedUsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private adminService: AdminService, private dialogService: DialogService) {}

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email']
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.adminService.unapprovedUsersObservable$.subscribe((users) => this.handleData(users))
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

  handleRowClick(user: IUser): void {
    const dialogContentPayload: IUser = user
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddUserDetailsComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)
  }
}
