import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Component({
  selector: 'num-dialog-add-user-details',
  templateUrl: './dialog-add-user-details.component.html',
  styleUrls: ['./dialog-add-user-details.component.scss'],
})
export class DialogAddUserDetailsComponent implements OnInit, IGenericDialog<IUser> {
  @Output() closeDialog = new EventEmitter()
  dialogInput: IUser
  userDetails: IUser
  roles: string[] = []

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.userDetails = this.dialogInput
  }

  handleDialogConfirm(): void {
    this.roles.forEach((role) => {
      this.adminService.addUserRoles(this.dialogInput.id, role).subscribe()
    })
    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
