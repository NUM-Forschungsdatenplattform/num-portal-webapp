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
import { PatientFilterComponent } from './components/patient-filter/patient-filter.component'

const routes: Routes = [
  {
    path: 'patient-filter',
    component: PatientFilterComponent,
    data: { tabNavId: 'patient-filter' },
  },
  { path: 'data-filter', component: DataFilterComponent, data: { tabNavId: 'data-filter' } },

  { path: '', redirectTo: 'search/patient-filter', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
