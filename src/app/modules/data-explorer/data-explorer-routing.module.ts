import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DataExplorerComponent } from './components/data-explorer/data-explorer.component'
import { DataExplorerProjectsComponent } from './components/data-explorer-projects/data-explorer-projects.component'
import { DataExplorerResolver } from './data-explorer.resolver'

const routes: Routes = [
  {
    path: 'projects',
    component: DataExplorerProjectsComponent,
    data: {
      tabNavId: 'overview',
    },
  },
  {
    path: 'projects/:id',
    component: DataExplorerComponent,
    resolve: { resolvedData: DataExplorerResolver },
    data: {
      tabNavId: 'data-explorer',
    },
  },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataExplorerRoutingModule {}
