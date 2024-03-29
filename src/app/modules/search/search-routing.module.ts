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
