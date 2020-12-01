import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IUser } from 'src/app/shared/models/admin/user.interface'

@Component({
  selector: 'num-unapproved-users-table',
  templateUrl: './unapproved-users-table.component.html',
  styleUrls: ['./unapproved-users-table.component.scss'],
})
export class UnapprovedUsersTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private adminService: AdminService) {}

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
    console.log('row click will be handled in the following subtask')
  }
}
