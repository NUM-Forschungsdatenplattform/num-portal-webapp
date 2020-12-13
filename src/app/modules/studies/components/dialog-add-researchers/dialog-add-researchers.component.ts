import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit {
  private subscriptions = new Subscription()

  @Output() closeDialog = new EventEmitter()
  users: IUser[]
  dialogInput: IUser[]
  dataSource = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'email', 'select']
  searchText = ''
  selectedResearchers: string[] = []
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.selectedResearchers = this.dialogInput.map((user: IUser) => {
      return user.id
    })

    // TODO Mina: Use approved users
    this.adminService.getUnapprovedUsers().subscribe()
    this.subscriptions.add(
      this.adminService.unapprovedUsersObservable$.subscribe((users) => {
        this.users = this.dataSource.data = users
        console.log('userss', users)
      })
    )
  }

  handleSearchChange(): void {
    if (this.searchText === '') {
      this.dataSource.data = this.users
    } else {
      const searchText = this.searchText.toLowerCase()

      this.dataSource.data = this.users.filter((user: IUser) => {
        const firstName = user.firstName.toLowerCase()
        const lastName = user.lastName.toLowerCase()

        return (
          firstName.includes(searchText) ||
          lastName.includes(searchText) ||
          searchText.includes(firstName) ||
          searchText.includes(lastName)
        )
      })
    }
  }

  handleSelectClick(user: IUser, isSelected: boolean): void {
    if (!isSelected) {
      if (!this.selectedResearchers.includes(user.id)) {
        this.selectedResearchers.push(user.id)
      }
    } else {
      const index = this.selectedResearchers.indexOf(user.id, 0)
      this.selectedResearchers.splice(index, 1)
    }
  }

  handleDialogConfirm(): void {
    const selectedUsers = this.users.filter((user: IUser) => {
      return this.selectedResearchers.includes(user.id)
    })

    this.closeDialog.emit(selectedUsers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
