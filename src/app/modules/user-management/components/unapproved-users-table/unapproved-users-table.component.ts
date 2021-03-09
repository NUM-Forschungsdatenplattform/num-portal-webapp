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
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { filter, map, take } from 'rxjs/operators'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

@Component({
  selector: 'num-unapproved-users-table',
  templateUrl: './unapproved-users-table.component.html',
  styleUrls: ['./unapproved-users-table.component.scss'],
})
export class UnapprovedUsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(
    private adminService: AdminService,
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {}

  displayedColumns: string[] = ['icon', 'firstName', 'lastName', 'email', 'createdTimestamp']
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
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(users: IUser[]): void {
    this.profileService.userProfileObservable$
      .pipe(
        filter((profile) => profile.id !== undefined),
        take(1),
        map((userProfile: IUserProfile) => {
          if (!userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
            this.dataSource.data = users.filter(
              (user) => user.organization?.id === userProfile.organization.id
            )
          } else {
            this.dataSource.data = users
          }
        })
      )
      .subscribe()
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
}
