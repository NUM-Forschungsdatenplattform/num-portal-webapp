import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchRoutingModule } from './search-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { PatientFilterComponent } from './components/patient-filter/patient-filter.component'
import { DataFilterComponent } from './components/data-filter/data-filter.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { PatientCountInfoComponent } from './components/patient-count-info/patient-count-info.component'
import { CohortGraphsComponent } from './components/cohort-graphs/cohort-graphs.component'
import { CohortBuilderModule } from '../cohort-builder/cohort-builder.module'
import { NgxEchartsModule } from 'ngx-echarts'
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component'
import { DataFilterTemplatesComponent } from './components/data-filter-templates/data-filter-templates.component'
import { ManagerDataExplorerComponent } from './components/manager-data-explorer/manager-data-explorer.component'
import { SharedProjectsModule } from '../projects/shared-projects.module'

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
