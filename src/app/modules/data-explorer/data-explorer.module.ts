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
import { DataExplorerComponent } from './components/data-explorer/data-explorer.component'
import { DataExplorerRoutingModule } from './data-explorer-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DataExplorerProjectsComponent } from './components/data-explorer-projects/data-explorer-projects.component'
import { DataExplorerProjectsTableComponent } from './components/data-explorer-projects-table/data-explorer-projects-table.component'
import { SharedProjectsModule } from '../projects/shared-projects.module'
import { ResultTableComponent } from './components/result-table/result-table.component'

@NgModule({
  declarations: [
    DataExplorerComponent,
    DataExplorerProjectsComponent,
    DataExplorerProjectsTableComponent,
    ResultTableComponent,
  ],
  imports: [
    CommonModule,
    DataExplorerRoutingModule,
    SharedModule,
    LayoutModule,
    SharedProjectsModule,
  ],
})
export class DataExplorerModule {}
