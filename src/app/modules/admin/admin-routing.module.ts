import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './components/admin/admin.component'
import { ApprovedUsersTableComponent } from './components/approved-users-table/approved-users-table.component'

const routes: Routes = [
  {
    path: 'users',
    component: ApprovedUsersTableComponent,
    data: {
      tabNavId: 'approved',
    },
  },
  {
    path: '',
    component: AdminComponent,
    data: {
      tabNavId: 'unapproved',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
