import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'
import { OrganizationService } from 'src/app/core/services/organization.service'
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
  organization: IOrganization = null
  showRoles: boolean = false

  constructor(
    private adminService: AdminService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.dialogInput
    this.organization = this.dialogInput.organization

    this.organizationService.getAll().subscribe()

    // TODO: Remove when roles are included in userInfo
    this.adminService.getUserRoles(this.dialogInput.id).subscribe(
      (roles) => {
        roles.forEach((role) => {
          this.roles.push(role['name'])
        })
      },
      (err) => {},
      () => {
        this.showRoles = true
      }
    )
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
