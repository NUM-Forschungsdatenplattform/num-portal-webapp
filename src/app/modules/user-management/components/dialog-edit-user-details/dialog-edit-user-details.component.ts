import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { forkJoin } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { EDIT_USER_ERROR, EDIT_USER_SUCCESS } from './constants'

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
    id: null,
  }
  availableRoles = AvailableRoles

  constructor(
    private adminService: AdminService,
    private organizationService: OrganizationService,
    private toastMessageService: ToastMessageService
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
    const addRoles = this.adminService.addUserRoles(this.userDetails.id, this.roles)
    const addOrganization = this.adminService.addUserOrganization(
      this.userDetails.id,
      this.organization
    )
    forkJoin([addRoles, addOrganization]).subscribe(
      (success) => {
        const messageConfig: IToastMessageConfig = {
          ...EDIT_USER_SUCCESS,
          messageParameters: {
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
          },
        }
        this.toastMessageService.openToast(messageConfig)
      },
      (error) => {
        this.toastMessageService.openToast(EDIT_USER_ERROR)
      }
    )

    this.adminService.refreshFilterResult()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
