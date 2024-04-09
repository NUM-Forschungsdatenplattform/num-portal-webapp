import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OrganizationEditorComponent } from './components/organization-editor/organization-editor.component'
import { OrganizationManagementComponent } from './components/organization-management/organization-management.component'
import { OrganizationResolver } from './organization.resolver'

const routes: Routes = [
  {
    path: ':id/editor',
    component: OrganizationEditorComponent,
    resolve: { resolvedData: OrganizationResolver },
    data: {
      tabNavId: 'editor',
    },
  },
  {
    path: '',
    component: OrganizationManagementComponent,
    data: {
      tabNavId: 'overview',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationManagementRoutingModule {}
