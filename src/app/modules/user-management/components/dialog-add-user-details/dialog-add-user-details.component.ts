import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
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
    this.adminService.approveUser(this.dialogInput.id).subscribe(() => {
      this.adminService.addUserRoles(this.userDetails.id, this.roles).subscribe()
      this.adminService.addUserOrganization(this.userDetails.id, this.organization).subscribe()
    })
    this.adminService.getUnapprovedUsers().subscribe()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
