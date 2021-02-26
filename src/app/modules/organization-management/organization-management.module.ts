import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OrganizationManagementComponent } from './components/organization-management/organization-management.component'
import { OrganizationEditorComponent } from './components/organization-editor/organization-editor.component'
import { OrganizationManagementRoutingModule } from './organization-management-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [OrganizationManagementComponent, OrganizationEditorComponent],
  imports: [CommonModule, OrganizationManagementRoutingModule, SharedModule, LayoutModule],
})
export class OrganizationManagementModule {}
