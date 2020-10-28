import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AqlsComponent } from './components/aqls/aqls.component'

const routes: Routes = [{ path: '', component: AqlsComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AqlsRoutingModule {}
