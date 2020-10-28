import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CohortsRoutingModule } from './cohorts-routing.module'
import { CohortsComponent } from './components/cohorts/cohorts.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [CohortsComponent],
  imports: [CommonModule, CohortsRoutingModule, SharedModule, LayoutModule],
})
export class CohortsModule {}
