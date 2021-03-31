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

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { UnapprovedUsersTableComponent } from './components/unapproved-users-table/unapproved-users-table.component'
import { AddUserRolesComponent } from './components/add-user-roles/add-user-roles.component'
import { AddUserOrganizationComponent } from './components/add-user-organization/add-user-organization.component'
import { ApprovedUsersComponent } from './components/approved-users/approved-users.component'
import { ApprovedUsersTableComponent } from './components/approved-users-table/approved-users-table.component'
import { DialogEditUserDetailsComponent } from './components/dialog-edit-user-details/dialog-edit-user-details.component'
import { UnapprovedUsersComponent } from './components/unapproved-users/unapproved-users.component'
import { UserManagementRoutingModule } from './user-management-routing.module'

@NgModule({
  declarations: [
    UnapprovedUsersComponent,
    UnapprovedUsersTableComponent,
    AddUserRolesComponent,
    AddUserOrganizationComponent,
    ApprovedUsersComponent,
    ApprovedUsersTableComponent,
    DialogEditUserDetailsComponent,
  ],
  imports: [CommonModule, UserManagementRoutingModule, SharedModule, LayoutModule],
})
export class UserManagementModule {}
