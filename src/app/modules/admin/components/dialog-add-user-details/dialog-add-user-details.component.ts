import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { IUser } from 'src/app/shared/models/admin/user.interface'

@Component({
  selector: 'num-dialog-add-user-details',
  templateUrl: './dialog-add-user-details.component.html',
  styleUrls: ['./dialog-add-user-details.component.scss'],
})
export class DialogAddUserDetailsComponent implements OnInit {
  @Output() closeDialog = new EventEmitter()
  dialogInput: IUser
  userDetails: IUser
  roles: string[] = []

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.userDetails = this.dialogInput
    // this.aqlService.getAll().subscribe()
  }

  handleDialogConfirm(): void {
    console.log(this.dialogInput, this.roles)
    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
