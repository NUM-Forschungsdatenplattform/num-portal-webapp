import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { MatAccordion } from '@angular/material/expansion'
import { FlexModule } from '@angular/flex-layout/flex'
import { ProjectEditorCohortBuilderComponent } from '../project-editor-cohort-builder/project-editor-cohort-builder.component'
import { ProjectEditorGeneralInfoComponent } from '../project-editor-general-info/project-editor-general-info.component'
import { ProjectEditorTemplatesComponent } from '../project-editor-templates/project-editor-templates.component'
import { ProjectEditorResearchersComponent } from '../project-editor-researchers/project-editor-researchers.component'

@Component({
  selector: 'num-project-editor-accordion',
  templateUrl: './project-editor-accordion.component.html',
  styleUrls: ['./project-editor-accordion.component.scss'],
  imports: [
    MatAccordion,
    FlexModule,
    ProjectEditorCohortBuilderComponent,
    ProjectEditorGeneralInfoComponent,
    ProjectEditorTemplatesComponent,
    ProjectEditorResearchersComponent,
  ],
})
export class ProjectEditorAccordionComponent {
  @Input() isResearchersFetched: boolean
  @Input() isCohortsFetched: boolean

  @Input() isTemplatesDisabled: boolean
  @Input() isResearchersDisabled: boolean
  @Input() isGeneralInfoDisabled: boolean
  @Input() isCohortBuilderDisabled: boolean
  @Input() isUserProjectAdmin: boolean
  @Input() showAttachmentsSelect: boolean
  @Input() isInPreview: boolean
  @Input() project: ProjectUiModel
  @Input() projectForm: UntypedFormGroup
  @Input() cohortGroup: CohortGroupUiModel
  @Input() generalInfoData: IDefinitionList[]

  @Input() isCohortValid: any

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}
}
