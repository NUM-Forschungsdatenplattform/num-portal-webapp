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
import { AddAqlsFilterTableComponent } from './components/add-aqls-filter-table/add-aqls-filter-table.component'
import { AddAqlsSelectedTableComponent } from './components/add-aqls-selected-table/add-aqls-selected-table.component'
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
    AddAqlsFilterTableComponent,
    AddAqlsSelectedTableComponent,
    DialogEditAqlComponent,
  ],
  imports: [CommonModule, PhenotypesRoutingModule, SharedModule, LayoutModule],
})
export class PhenotypesModule {}
