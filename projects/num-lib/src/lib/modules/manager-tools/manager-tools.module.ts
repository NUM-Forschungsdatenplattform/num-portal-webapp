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
import { ManagerToolsComponent } from './components/manager-tools/manager-tools.component'
import { ManagerToolsRoutingModule } from './manager-tools-routing.module'
import { BarChartComponent } from './components/bar-chart/bar-chart.component'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { ManagerChartsComponent } from './components/manager-charts/manager-charts.component'
import { PseudonymResolverComponent } from './components/pseudonym-resolver/pseudonym-resolver.component'
import { SharedModule } from '../../shared/shared.module'
import { LayoutModule } from '../../layout/layout.module'

@NgModule({
  declarations: [
    ManagerToolsComponent,
    BarChartComponent,
    ManagerChartsComponent,
    PseudonymResolverComponent,
  ],
  exports: [ManagerToolsComponent, BarChartComponent],
  imports: [CommonModule, ManagerToolsRoutingModule, NgxChartsModule, SharedModule, LayoutModule],
})
export class ManagerToolsModule {}
