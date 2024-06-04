import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DataFilterComponent } from './components/data-filter/data-filter.component'
import { ManagerDataExplorerComponent } from './components/manager-data-explorer/manager-data-explorer.component'
import { PatientFilterComponent } from './components/patient-filter/patient-filter.component'
import { DataFilterResolver } from './data-filter.resolver'

const routes: Routes = [
  {
    path: '',
    component: PatientFilterComponent,
    data: { tabNavId: 'patient-filter' },
  },
  {
    path: 'data-filter',
    component: DataFilterComponent,
    resolve: { resolvedData: DataFilterResolver },
    data: { tabNavId: 'data-filter' },
  },
  {
    path: 'data-explorer',
    component: ManagerDataExplorerComponent,
    resolve: { resolvedData: DataFilterResolver },
    data: { tabNavId: 'data-explorer' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
