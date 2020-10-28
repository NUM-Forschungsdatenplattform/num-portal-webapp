import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CohortsComponent } from './components/cohorts/cohorts.component'

const routes: Routes = [{ path: '', component: CohortsComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CohortsRoutingModule {}
