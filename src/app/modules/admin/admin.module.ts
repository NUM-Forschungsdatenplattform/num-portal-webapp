import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './components/admin/admin.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { UserTableComponent } from './components/user-table/user-table.component'

@NgModule({
  declarations: [AdminComponent, UserTableComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, LayoutModule],
})
export class AdminModule {}
