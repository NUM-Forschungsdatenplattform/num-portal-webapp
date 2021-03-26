import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectEditorGeneralInfoComponent } from './components/project-editor-general-info/project-editor-general-info.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { ProjectEditorConnectorComponent } from './components/project-editor-connector/project-editor-connector.component'
import { ProjectEditorTemplatesComponent } from './components/project-editor-templates/project-editor-templates.component'
import { ProjectEditorResearchersComponent } from './components/project-editor-researchers/project-editor-researchers.component'
import { AddTemplateSelectedTableComponent } from './components/add-template-selected-table/add-template-selected-table.component'
import { ProjectEditorConnectorGroupComponent } from './components/project-editor-connector-group/project-editor-connector-group.component'
import { ProjectEditorConnectorPhenotypeComponent } from './components/project-editor-connector-phenotype/project-editor-connector-phenotype.component'
import { ProjectEditorGeneralInfoKeywordsInputComponent } from './components/project-editor-general-info-keywords-input/project-editor-general-info-keywords-input.component'
import { ProjectEditorGeneralInfoCategoriesInputComponent } from './components/project-editor-general-info-categories-input/project-editor-general-info-categories-input.component'

const SHARED_DECLARATIONS = [
  ProjectEditorGeneralInfoComponent,
  ProjectEditorConnectorComponent,
  ProjectEditorTemplatesComponent,
  ProjectEditorResearchersComponent,
  AddTemplateSelectedTableComponent,
  ProjectEditorConnectorGroupComponent,
  ProjectEditorConnectorPhenotypeComponent,
  ProjectEditorGeneralInfoKeywordsInputComponent,
  ProjectEditorGeneralInfoCategoriesInputComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule, SharedModule, LayoutModule],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedProjectsModule {}
