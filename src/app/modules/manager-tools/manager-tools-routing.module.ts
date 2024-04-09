import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ManagerToolsComponent } from './components/manager-tools/manager-tools.component'

const routes: Routes = [
  {
    path: '',
    component: ManagerToolsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerToolsRoutingModule {}
