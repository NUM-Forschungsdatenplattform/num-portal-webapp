import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { cloneDeep } from 'lodash-es'
import { forkJoin, of } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { APPROVE_USER_ERROR, APPROVE_USER_SUCCESS } from './constants'

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
      this.organization = cloneDeep(this.dialogInput.organization)
    }

    this.organizationService.getAll().subscribe()
  }

  hasOrganizationChanged(): boolean {
    return this.dialogInput.organization?.id !== this.organization.id
  }

  handleDialogConfirm(): void {
    const approveUser = this.adminService.approveUser(this.dialogInput.id)
    const addRoles = this.adminService.addUserRoles(this.userDetails.id, this.roles)
    const addOrganization = this.hasOrganizationChanged()
      ? this.adminService.addUserOrganization(this.userDetails.id, this.organization)
      : of(null)

    forkJoin([approveUser, addRoles, addOrganization]).subscribe(
      (success) => {
        const messageConfig: IToastMessageConfig = {
          ...APPROVE_USER_SUCCESS,
          messageParameters: {
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
          },
        }
        this.toastMessageService.openToast(messageConfig)
      },
      (error) => {
        this.toastMessageService.openToast(APPROVE_USER_ERROR)
      }
    )

    this.adminService.getUnapprovedUsers().subscribe()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
