import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatTableDataSource } from '@angular/material/table'
import { cloneDeep } from 'lodash-es'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit, OnDestroy, IGenericDialog<IUser[]> {
  private subscriptions = new Subscription()

  dialogInput: IUser[]
  @Output() closeDialog = new EventEmitter<IUser[]>()

  dataSource = new MatTableDataSource<IUser>()

  selectedResearchers: IUser[] = []
  filterConfig: IUserFilter

  columnPaths = [['firstName'], ['lastName'], ['organization', 'name'], ['select']]
  columnKeys = ['firstName', 'lastName', 'info', 'isSelected']

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.setLastFilter()
    this.handleDilaogInput()

    this.adminService.getApprovedUsers().subscribe()
    this.subscriptions.add(
      this.adminService.filteredApprovedUsersObservable$.subscribe((users) => {
        this.handleUsersData(users)
      })
    )
  }

  setLastFilter(): void {
    this.adminService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  handleUsersData(users: IUser[]): void {
    this.dataSource.data = users
  }

  handleDilaogInput(): void {
    this.selectedResearchers = cloneDeep(this.dialogInput)
  }

  handleSearchChange(): void {
    this.adminService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.selectedResearchers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
