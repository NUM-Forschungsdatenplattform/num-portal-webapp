import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Component({
  selector: 'num-dialog-edit-user-details',
  templateUrl: './dialog-edit-user-details.component.html',
  styleUrls: ['./dialog-edit-user-details.component.scss'],
})
export class DialogEditUserDetailsComponent implements OnInit {
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
    if (this.dialogInput.organization) {
      this.organization = this.dialogInput.organization
    }
    if (this.dialogInput.roles) {
      this.roles = this.dialogInput.roles
    }

    this.organizationService.getAll().subscribe()
  }

  handleDialogConfirm(): void {
    this.adminService.addUserRoles(this.userDetails.id, this.roles).subscribe()
    this.adminService.addUserOrganization(this.userDetails.id, this.organization).subscribe()
    this.adminService.refreshFilterResult()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
