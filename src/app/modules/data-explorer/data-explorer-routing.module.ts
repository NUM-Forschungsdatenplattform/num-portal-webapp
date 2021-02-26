import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DataExplorerComponent } from './components/data-explorer/data-explorer.component'
import { DataExplorerStudiesComponent } from './components/data-explorer-studies/data-explorer-studies.component'
import { DataExplorerResolver } from './data-explorer.resolver'

const routes: Routes = [
  {
    path: 'studies',
    component: DataExplorerStudiesComponent,
    data: {
      tabNavId: 'overview',
    },
  },
  {
    path: 'studies/:id',
    component: DataExplorerComponent,
    resolve: { resolvedData: DataExplorerResolver },
    data: {
      tabNavId: 'data-explorer',
    },
  },
  { path: '', redirectTo: 'studies', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataExplorerRoutingModule {}
