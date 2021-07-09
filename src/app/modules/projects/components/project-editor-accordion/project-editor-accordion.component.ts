import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-project-editor-accordion',
  templateUrl: './project-editor-accordion.component.html',
  styleUrls: ['./project-editor-accordion.component.scss'],
})
export class ProjectEditorAccordionComponent implements OnInit {
  @Input() isResearchersFetched: boolean
  @Input() isCohortsFetched: boolean

  @Input() isTemplatesDisabled: boolean
  @Input() isResearchersDisabled: boolean
  @Input() isGeneralInfoDisabled: boolean
  @Input() isCohortBuilderDisabled: boolean

  @Input() project: ProjectUiModel
  @Input() projectForm: FormGroup
  @Input() cohortGroup: CohortGroupUiModel
  @Input() generalInfoData: IDefinitionList[]

  constructor() {}

  ngOnInit(): void {}
}
