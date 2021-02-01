import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudiesRoutingModule } from './studies-routing.module'
import { StudiesComponent } from './components/studies/studies.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { StudyEditorComponent } from './components/study-editor/study-editor.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DialogEditPhenotypeComponent } from './components/dialog-edit-phenotype/dialog-edit-phenotype.component'
import { DialogAddPhenotypesComponent } from './components/dialog-add-phenotypes/dialog-add-phenotypes.component'
import { AddPhenotypesFilterTableComponent } from './components/add-phenotypes-filter-table/add-phenotypes-filter-table.component'
import { AddPhenotypesPreviewComponent } from './components/add-phenotypes-preview/add-phenotypes-preview.component'
import { AddTemplatesFilterTableComponent } from './components/add-templates-filter-table/add-templates-filter-table.component'
import { DialogAddTemplateComponent } from './components/dialog-add-template/dialog-add-template.component'
import { StudiesTableComponent } from './components/studies-table/studies-table.component'
import { DialogAddResearchersComponent } from './components/dialog-add-researchers/dialog-add-researchers.component'
import { StudyEditorButtonsComponent } from './components/study-editor-buttons/study-editor-buttons.component'
import { DialogConfirmStudyComponent } from './components/dialog-confirm-study/dialog-confirm-study.component'
import { StudyEditorCommentsComponent } from './components/study-editor-comments/study-editor-comments.component'
import { StudyEditorApprovalComponent } from './components/study-editor-approval/study-editor-approval.component'
import { SharedStudiesModule } from './shared-studies.module'
import { DialogConfirmStudyApprovalComponent } from './components/dialog-confirm-study-approval/dialog-confirm-study-approval.component'

@NgModule({
  declarations: [
    StudiesComponent,
    StudyEditorComponent,
    DialogEditPhenotypeComponent,
    DialogAddPhenotypesComponent,
    DialogAddTemplateComponent,
    AddPhenotypesFilterTableComponent,
    AddPhenotypesPreviewComponent,
    AddTemplatesFilterTableComponent,
    StudiesTableComponent,
    DialogAddResearchersComponent,
    StudyEditorButtonsComponent,
    DialogConfirmStudyComponent,
    StudyEditorCommentsComponent,
    StudyEditorApprovalComponent,
    DialogConfirmStudyApprovalComponent,
  ],
  imports: [CommonModule, StudiesRoutingModule, SharedModule, LayoutModule, SharedStudiesModule],
})
export class StudiesModule {}
