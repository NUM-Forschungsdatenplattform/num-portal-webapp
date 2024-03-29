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

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ExtendedModule } from '@angular/flex-layout'
import { LayoutModule } from '../../layout/layout.module'
import { MetricsComponent } from './components/metrics/metrics.component'
import { LatestProjectsComponent } from './components/latest-projects/latest-projects.component'

@NgModule({
  declarations: [DashboardComponent, MetricsComponent, LatestProjectsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, ExtendedModule, LayoutModule],
})
export class DashboardModule {}
