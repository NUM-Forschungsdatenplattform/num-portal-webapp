import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ExtendedModule } from '@angular/flex-layout'
import { LayoutModule } from '../../layout/layout.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ExtendedModule, LayoutModule],
})
export class DashboardModule {}
