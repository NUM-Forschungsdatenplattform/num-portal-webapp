import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './components/admin/admin.component'
import { ApprovedUsersComponent } from './components/approved-users/approved-users.component'

const routes: Routes = [
  {
    path: 'all',
    component: ApprovedUsersComponent,
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
