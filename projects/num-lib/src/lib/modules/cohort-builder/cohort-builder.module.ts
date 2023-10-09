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
import { CohortBuilderComponent } from './components/cohort-builder/cohort-builder.component'
import { AqlSelectionComponent } from './components/aql-selection/aql-selection.component'
import { AqlConnectorGroupComponent } from './components/aql-connector-group/aql-connector-group.component'
import { AqlConnectorItemComponent } from './components/aql-connector-item/aql-connector-item.component'
import { DialogAqlInfoComponent } from './components/dialog-aql-info/dialog-aql-info.component'
import { SharedModule } from '../../shared/shared.module'
import { LayoutModule } from '../../layout/layout.module'

const SHARED_DECLARATIONS = [
  CohortBuilderComponent,
  AqlSelectionComponent,
  AqlConnectorGroupComponent,
  AqlConnectorItemComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS, DialogAqlInfoComponent],
  imports: [CommonModule, LayoutModule, SharedModule],
  exports: [...SHARED_DECLARATIONS],
})
export class CohortBuilderModule {}
