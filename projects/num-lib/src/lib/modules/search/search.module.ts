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
import { CommonModule } from '@angular/common'
import { SearchRoutingModule } from './search-routing.module'
import { PatientFilterComponent } from './components/patient-filter/patient-filter.component'
import { DataFilterComponent } from './components/data-filter/data-filter.component'
import { PatientCountInfoComponent } from './components/patient-count-info/patient-count-info.component'
import { CohortGraphsComponent } from './components/cohort-graphs/cohort-graphs.component'
import { CohortBuilderModule } from '../cohort-builder/cohort-builder.module'
import { NgxEchartsModule } from 'ngx-echarts'
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component'
import { DataFilterTemplatesComponent } from './components/data-filter-templates/data-filter-templates.component'
import { ManagerDataExplorerComponent } from './components/manager-data-explorer/manager-data-explorer.component'
import { SharedProjectsModule } from '../projects/shared-projects.module'
import { SharedModule } from '../../shared/shared.module'
import { LayoutModule } from '../../layout/layout.module'

@NgModule({
  declarations: [
    CohortGraphsComponent,
    DataFilterComponent,
    PatientCountInfoComponent,
    PatientFilterComponent,
    DataFilterTemplatesComponent,
    VerticalBarChartComponent,
    ManagerDataExplorerComponent,
  ],
  imports: [
    CohortBuilderModule,
    CommonModule,
    LayoutModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SearchRoutingModule,
    SharedModule,
    SharedProjectsModule,
  ],
})
export class SearchModule {}
