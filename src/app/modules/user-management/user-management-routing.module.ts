import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ApprovedUsersComponent } from './components/approved-users/approved-users.component'
import { UnapprovedUsersComponent } from './components/unapproved-users/unapproved-users.component'

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
    component: UnapprovedUsersComponent,
    data: {
      tabNavId: 'unapproved',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
