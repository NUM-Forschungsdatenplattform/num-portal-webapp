import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IFilterTable } from 'src/app/shared/models/filter-table.interface'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  dialogInput: IUser[]
  @Output() closeDialog = new EventEmitter()

  users: IUser[]
  usersTableItems: IFilterTable[]
  selectedResearchers: { [id: number]: boolean } = {}
  filterConfig: IUserFilter

  constructor(private adminService: AdminService) {
    this.adminService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.handleDilaogInput()

    this.adminService.getApprovedUsers().subscribe()
    this.subscriptions.add(
      this.adminService.filteredApprovedUsersObservable$.subscribe((users) => {
        this.handleUsersData(users)
      })
    )
  }

  handleUsersData(users: IUser[]): void {
    this.users = users
    this.usersTableItems = users.map((u: IUser) => {
      return {
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        info: u.email,
        isSelected: this.selectedResearchers && this.selectedResearchers[u.id],
      }
    })
  }

  handleDilaogInput(): void {
    if (!(this.dialogInput && this.dialogInput.length > 0)) return

    this.dialogInput.forEach((user: IUser) => {
      this.selectedResearchers[user.id] = true
    })
  }

  handleSearchChange(): void {
    this.adminService.setFilter(this.filterConfig)
  }

  selectedResearchersChange(selectedResearchers: IFilterTable[]): void {
    selectedResearchers.forEach((item) => {
      this.selectedResearchers[item.id] = item.isSelected
    })
  }

  handleDialogConfirm(): void {
    const selectedUsers = this.users.filter((user: IUser) => {
      return this.usersTableItems.find((u) => {
        return u.id === user.id && u.isSelected
      })
    })

    this.closeDialog.emit(selectedUsers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
