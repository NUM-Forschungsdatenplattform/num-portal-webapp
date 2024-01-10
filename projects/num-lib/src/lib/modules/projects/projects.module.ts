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
import { ProjectEditorComponent } from './components/project-editor/project-editor.component'
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
import { LayoutModule } from '../../layout/layout.module'
import { SharedModule } from '../../shared/shared.module'
import { MatDividerModule } from '@angular/material/divider'
import { MatPaginatorModule } from '@angular/material/paginator'

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
  ],
  imports: [ MatDividerModule, MatPaginatorModule, CommonModule, ProjectsRoutingModule, SharedModule, LayoutModule, SharedProjectsModule],
})
export class ProjectsModule {}
