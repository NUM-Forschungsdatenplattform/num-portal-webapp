/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
