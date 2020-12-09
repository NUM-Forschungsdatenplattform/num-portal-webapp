import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './components/admin/admin.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { UnapprovedUsersTableComponent } from './components/unapproved-users-table/unapproved-users-table.component'
import { DialogAddUserDetailsComponent } from './components/dialog-add-user-details/dialog-add-user-details.component'
import { AddUserRolesComponent } from './components/add-user-roles/add-user-roles.component'

@NgModule({
  declarations: [
    AdminComponent,
    UnapprovedUsersTableComponent,
    DialogAddUserDetailsComponent,
    AddUserRolesComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, LayoutModule],
})
export class AdminModule {}
