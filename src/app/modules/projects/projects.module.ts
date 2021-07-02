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

import { ProjectsRoutingModule } from './projects-routing.module'
import { ProjectsComponent } from './components/projects/projects.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectEditorComponent } from './components/project-editor/project-editor.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { AddTemplatesFilterTableComponent } from './components/add-templates-filter-table/add-templates-filter-table.component'
import { DialogAddTemplateComponent } from './components/dialog-add-template/dialog-add-template.component'
import { ProjectsTableComponent } from './components/projects-table/projects-table.component'
import { DialogAddResearchersComponent } from './components/dialog-add-researchers/dialog-add-researchers.component'
import { ProjectEditorButtonsComponent } from './components/project-editor-buttons/project-editor-buttons.component'
import { DialogConfirmProjectComponent } from './components/dialog-confirm-project/dialog-confirm-project.component'
import { ProjectEditorCommentsComponent } from './components/project-editor-comments/project-editor-comments.component'
import { ProjectEditorApprovalComponent } from './components/project-editor-approval/project-editor-approval.component'
import { SharedProjectsModule } from './shared-projects.module'
import { DialogConfirmProjectApprovalComponent } from './components/dialog-confirm-project-approval/dialog-confirm-project-approval.component'
import { CohortBuilderModule } from '../cohort-builder/cohort-builder.module'
import { ProjectEditorCohortBuilderComponent } from './components/project-editor-cohort-builder/project-editor-cohort-builder.component'

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectEditorComponent,
    DialogAddTemplateComponent,
    AddTemplatesFilterTableComponent,
    ProjectsTableComponent,
    DialogAddResearchersComponent,
    ProjectEditorButtonsComponent,
    DialogConfirmProjectComponent,
    ProjectEditorCommentsComponent,
    ProjectEditorApprovalComponent,
    DialogConfirmProjectApprovalComponent,
    ProjectEditorCohortBuilderComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    LayoutModule,
    SharedProjectsModule,
    CohortBuilderModule,
  ],
})
export class ProjectsModule {}
