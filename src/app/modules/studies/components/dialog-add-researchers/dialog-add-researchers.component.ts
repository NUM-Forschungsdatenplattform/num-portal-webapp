import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit {
  private subscriptions = new Subscription()

  dialogInput: IUser[]
  @Output() closeDialog = new EventEmitter()

  users: IUser[]
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
        this.users = [...users]
      })
    )
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

  selectedResearchersChange(selectedResearchers: { [id: number]: boolean }): void {
    this.selectedResearchers = selectedResearchers
  }

  handleDialogConfirm(): void {
    const selectedUsers = this.users.filter((user: IUser) => {
      return this.selectedResearchers[user.id]
    })

    this.closeDialog.emit(selectedUsers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
