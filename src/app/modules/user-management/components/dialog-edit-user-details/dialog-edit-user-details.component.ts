/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { APPROVE_USER_SUCCESS, EDIT_USER_ERROR, EDIT_USER_SUCCESS } from './constants'

@Component({
  selector: 'num-dialog-edit-user-details',
  templateUrl: './dialog-edit-user-details.component.html',
  styleUrls: ['./dialog-edit-user-details.component.scss'],
})
export class DialogEditUserDetailsComponent
  implements OnInit, IGenericDialog<{ user: IUser; isApproval: boolean }> {
  @Output() closeDialog = new EventEmitter()
  dialogInput: { user: IUser; isApproval: boolean }
  userDetails: IUser
  isApproval: boolean
  roles: string[] = []
  organization: IOrganization = {
    id: undefined,
  }
  availableRoles = AvailableRoles

  constructor(
    private adminService: AdminService,
    private organizationService: OrganizationService,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.dialogInput.user
    this.isApproval = this.dialogInput.isApproval

    if (this.userDetails.organization) {
      this.organization = cloneDeep(this.userDetails.organization)
    }
    if (this.userDetails.roles) {
      this.roles = cloneDeep(this.userDetails.roles)
    }

    this.organizationService.getAll().subscribe()
  }

  hasOrganizationChanged(): boolean {
    return this.userDetails.organization?.id !== this.organization.id
  }

  handleDialogConfirm(): void {
    const approveUserTask$ = this.isApproval
      ? this.adminService.approveUser(this.userDetails.id)
      : of(null)

    const addRolesTask$ = this.adminService.addUserRoles(this.userDetails.id, this.roles)

    const addOrganizationTask$ = this.hasOrganizationChanged()
      ? this.adminService.addUserOrganization(this.userDetails.id, this.organization)
      : of(null)

    forkJoin([approveUserTask$, addRolesTask$, addOrganizationTask$]).subscribe(
      () => {
        const messageConfig: IToastMessageConfig = {
          ...(this.isApproval ? APPROVE_USER_SUCCESS : EDIT_USER_SUCCESS),
          messageParameters: {
            firstName: this.userDetails.firstName,
            lastName: this.userDetails.lastName,
          },
        }
        this.toastMessageService.openToast(messageConfig)
      },
      () => {
        this.toastMessageService.openToast(EDIT_USER_ERROR)
      }
    )

    this.isApproval
      ? this.adminService.getUnapprovedUsers().subscribe()
      : this.adminService.refreshFilterResult()

    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
