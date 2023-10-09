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

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'
import { FilterChipsComponent } from './filter-chips/filter-chips.component'
import { SearchComponent } from './search/search.component'
import { FilterTableComponent } from './filter-table/filter-table.component'
import { PipesModule } from '../pipes/pipes.module'
import { DefinitionListComponent } from './definition-list/definition-list.component'
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component'
import { TimeInputComponent } from './time-input/time-input.component'
import { EditorDetermineHitsComponent } from './editor-determine-hits/editor-determine-hits.component'
import { AqlParameterInputsComponent } from './aql-parameter-inputs/aql-parameter-inputs.component'
import { ResultTableComponent } from './result-table/result-table.component'
import { MaterialModule } from '../../layout/material/material.module'
import { ButtonComponent } from './button/button.component'

const SHARED_DECLARATIONS = [
  SearchComponent,
  FilterChipsComponent,
  ButtonComponent,
  FilterTableComponent,
  DefinitionListComponent,
  TimeInputComponent,
  DialogConfirmationComponent,
  EditorDetermineHitsComponent,
  AqlParameterInputsComponent,
  ResultTableComponent,
]

@NgModule({
  declarations: SHARED_DECLARATIONS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
  ],
  exports: SHARED_DECLARATIONS,
})
export class SharedComponentsModule {}
