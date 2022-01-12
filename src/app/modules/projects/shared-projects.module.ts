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
import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectEditorGeneralInfoComponent } from './components/project-editor-general-info/project-editor-general-info.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { ProjectEditorTemplatesComponent } from './components/project-editor-templates/project-editor-templates.component'
import { ProjectEditorResearchersComponent } from './components/project-editor-researchers/project-editor-researchers.component'
import { ProjectEditorGeneralInfoKeywordsInputComponent } from './components/project-editor-general-info-keywords-input/project-editor-general-info-keywords-input.component'
import { ProjectEditorGeneralInfoCategoriesInputComponent } from './components/project-editor-general-info-categories-input/project-editor-general-info-categories-input.component'
import { ProjectEditorCohortBuilderComponent } from './components/project-editor-cohort-builder/project-editor-cohort-builder.component'
import { CohortBuilderModule } from '../cohort-builder/cohort-builder.module'
import { ProjectEditorAccordionComponent } from './components/project-editor-accordion/project-editor-accordion.component'
import { AddTemplatesComponent } from './components/add-templates/add-templates.component'

const SHARED_DECLARATIONS = [
  ProjectEditorAccordionComponent,
  ProjectEditorCohortBuilderComponent,
  ProjectEditorGeneralInfoComponent,
  ProjectEditorTemplatesComponent,
  ProjectEditorResearchersComponent,
  AddTemplatesComponent,
  ProjectEditorGeneralInfoKeywordsInputComponent,
  ProjectEditorGeneralInfoCategoriesInputComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule, SharedModule, LayoutModule, CohortBuilderModule],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedProjectsModule {}
