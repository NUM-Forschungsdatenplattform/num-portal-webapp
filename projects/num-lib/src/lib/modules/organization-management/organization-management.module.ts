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
import { OrganizationManagementComponent } from './components/organization-management/organization-management.component'
import { OrganizationEditorComponent } from './components/organization-editor/organization-editor.component'
import { OrganizationManagementRoutingModule } from './organization-management-routing.module'
import { OrganizationsTableComponent } from './components/organizations-table/organizations-table.component'
import { LayoutModule } from '../../layout/layout.module'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    OrganizationManagementComponent,
    OrganizationEditorComponent,
    OrganizationsTableComponent,
  ],
  imports: [CommonModule, OrganizationManagementRoutingModule, SharedModule, LayoutModule],
})
export class OrganizationManagementModule {}
