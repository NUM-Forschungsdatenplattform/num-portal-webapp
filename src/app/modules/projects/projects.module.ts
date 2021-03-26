import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProjectsRoutingModule } from './projects-routing.module'
import { ProjectsComponent } from './components/projects/projects.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectEditorComponent } from './components/project-editor/project-editor.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DialogEditPhenotypeComponent } from './components/dialog-edit-phenotype/dialog-edit-phenotype.component'
import { DialogAddPhenotypesComponent } from './components/dialog-add-phenotypes/dialog-add-phenotypes.component'
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

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectEditorComponent,
    DialogEditPhenotypeComponent,
    DialogAddPhenotypesComponent,
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
  imports: [CommonModule, ProjectsRoutingModule, SharedModule, LayoutModule, SharedProjectsModule],
})
export class ProjectsModule {}
