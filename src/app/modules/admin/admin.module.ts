import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './components/admin/admin.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { UnapprovedUsersTableComponent } from './components/unapproved-users-table/unapproved-users-table.component'
import { DialogAddUserDetailsComponent } from './components/dialog-add-user-details/dialog-add-user-details.component'
import { AddUserRolesComponent } from './components/add-user-roles/add-user-roles.component'
import { AddUserOrganizationComponent } from './components/add-user-organization/add-user-organization.component'
import { ApprovedUsersComponent } from './components/approved-users/approved-users.component'
import { ApprovedUsersTableComponent } from './components/approved-users-table/approved-users-table.component'
import { DialogEditUserDetailsComponent } from './components/dialog-edit-user-details/dialog-edit-user-details.component'

@NgModule({
  declarations: [
    AdminComponent,
    UnapprovedUsersTableComponent,
    DialogAddUserDetailsComponent,
    AddUserRolesComponent,
    AddUserOrganizationComponent,
    ApprovedUsersComponent,
    ApprovedUsersTableComponent,
    DialogEditUserDetailsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, LayoutModule],
})
export class AdminModule {}
