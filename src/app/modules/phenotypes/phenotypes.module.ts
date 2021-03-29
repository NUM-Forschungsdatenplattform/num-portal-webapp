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

import { PhenotypesRoutingModule } from './phenotypes-routing.module'
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { PhenotypeEditorComponent } from './components/phenotype-editor/phenotype-editor.component'
import { PhenotypeTableComponent } from './components/phenotype-table/phenotype-table.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { PhenotypeEditorGeneralInfoComponent } from './components/phenotype-editor-general-info/phenotype-editor-general-info.component'
import { PhenotypeEditorConnectorComponent } from './components/phenotype-editor-connector/phenotype-editor-connector.component'
import { PhenotypeEditorConnectorGroupComponent } from './components/phenotype-editor-connector-group/phenotype-editor-connector-group.component'
import { PhenotypeEditorConnectorAqlComponent } from './components/phenotype-editor-connector-aql/phenotype-editor-connector-aql.component'
import { DialogAddAqlsComponent } from './components/dialog-add-aqls/dialog-add-aqls.component'
import { DialogEditAqlComponent } from './components/dialog-edit-aql/dialog-edit-aql.component'

@NgModule({
  declarations: [
    PhenotypesComponent,
    PhenotypeEditorComponent,
    PhenotypeTableComponent,
    PhenotypeEditorGeneralInfoComponent,
    PhenotypeEditorConnectorComponent,
    PhenotypeEditorConnectorGroupComponent,
    PhenotypeEditorConnectorAqlComponent,
    DialogAddAqlsComponent,
    DialogEditAqlComponent,
  ],
  imports: [CommonModule, PhenotypesRoutingModule, SharedModule, LayoutModule],
})
export class PhenotypesModule {}
