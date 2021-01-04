import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

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
  organization: IOrganization = {
    id: '',
  }

  constructor(
    private adminService: AdminService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.dialogInput
    this.organizationService.getAll().subscribe()
  }

  handleDialogConfirm(): void {
    this.adminService.addUserRoles(this.dialogInput.id, this.roles).subscribe()

    this.adminService.addUserOrganization(this.dialogInput.id, this.organization).subscribe()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
