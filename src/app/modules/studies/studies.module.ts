import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudiesRoutingModule } from './studies-routing.module'
import { StudiesComponent } from './components/studies/studies.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { StudyEditorComponent } from './components/study-editor/study-editor.component'
import { StudyEditorGeneralInfoComponent } from './components/study-editor-general-info/study-editor-general-info.component'
import { LayoutModule } from 'src/app/layout/layout.module';
import { StudyEditorConnectorComponent } from './components/study-editor-connector/study-editor-connector.component';
import { StudyEditorConnectorGroupComponent } from './components/study-editor-connector-group/study-editor-connector-group.component';
import { StudyEditorConnectorPhenotypeComponent } from './components/study-editor-connector-phenotype/study-editor-connector-phenotype.component';
import { DialogEditPhenotypeComponent } from './components/dialog-edit-phenotype/dialog-edit-phenotype.component';
import { DialogAddPhenotypesComponent } from './components/dialog-add-phenotypes/dialog-add-phenotypes.component';
import { AddPhenotypesFilterTableComponent } from './components/add-phenotypes-filter-table/add-phenotypes-filter-table.component';
import { AddPhenotypesPreviewComponent } from './components/add-phenotypes-preview/add-phenotypes-preview.component'

@NgModule({
  declarations: [StudiesComponent, StudyEditorComponent, StudyEditorGeneralInfoComponent, StudyEditorConnectorComponent, StudyEditorConnectorGroupComponent, StudyEditorConnectorPhenotypeComponent, DialogEditPhenotypeComponent, DialogAddPhenotypesComponent, AddPhenotypesFilterTableComponent, AddPhenotypesPreviewComponent],
  imports: [CommonModule, StudiesRoutingModule, SharedModule, LayoutModule],
})
export class StudiesModule {}
