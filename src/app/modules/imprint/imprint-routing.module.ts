import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ImprintComponent } from './components/imprint.component'

const routes: Routes = [{ path: '', component: ImprintComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintRoutingModule {}
