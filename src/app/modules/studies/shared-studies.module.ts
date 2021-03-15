import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/shared/shared.module'
import { StudyEditorGeneralInfoComponent } from './components/study-editor-general-info/study-editor-general-info.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { StudyEditorConnectorComponent } from './components/study-editor-connector/study-editor-connector.component'
import { StudyEditorTemplatesComponent } from './components/study-editor-templates/study-editor-templates.component'
import { StudyEditorResearchersComponent } from './components/study-editor-researchers/study-editor-researchers.component'
import { AddTemplateSelectedTableComponent } from './components/add-template-selected-table/add-template-selected-table.component'
import { StudyEditorConnectorGroupComponent } from './components/study-editor-connector-group/study-editor-connector-group.component'
import { StudyEditorConnectorPhenotypeComponent } from './components/study-editor-connector-phenotype/study-editor-connector-phenotype.component'
import { StudyEditorGeneralInfoKeywordsInputComponent } from './components/study-editor-general-info-keywords-input/study-editor-general-info-keywords-input.component'
import { StudyEditorGeneralInfoCategoriesInputComponent } from './components/study-editor-general-info-categories-input/study-editor-general-info-categories-input.component'

const SHARED_DECLARATIONS = [
  StudyEditorGeneralInfoComponent,
  StudyEditorConnectorComponent,
  StudyEditorTemplatesComponent,
  StudyEditorResearchersComponent,
  AddTemplateSelectedTableComponent,
  StudyEditorConnectorGroupComponent,
  StudyEditorConnectorPhenotypeComponent,
  StudyEditorGeneralInfoKeywordsInputComponent,
  StudyEditorGeneralInfoCategoriesInputComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule, SharedModule, LayoutModule],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedStudiesModule {}
