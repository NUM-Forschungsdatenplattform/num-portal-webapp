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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IDetermineHits } from 'projects/num-lib/src/lib/shared/components/editor-determine-hits/determine-hits.interface'
import { IDefinitionList } from 'projects/num-lib/src/lib/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'projects/num-lib/src/lib/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'projects/num-lib/src/lib/shared/models/project/project-ui.model'

@Component({
  selector: 'num-project-editor-accordion',
  templateUrl: './project-editor-accordion.component.html',
  styleUrls: ['./project-editor-accordion.component.scss'],
})
export class ProjectEditorAccordionComponent {
  @Input() isResearchersFetched: boolean
  @Input() isCohortsFetched: boolean

  @Input() isTemplatesDisabled: boolean
  @Input() isResearchersDisabled: boolean
  @Input() isGeneralInfoDisabled: boolean
  @Input() isCohortBuilderDisabled: boolean
  @Input() isUserProjectAdmin: boolean
  @Input() project: ProjectUiModel
  @Input() projectForm: FormGroup
  @Input() cohortGroup: CohortGroupUiModel
  @Input() generalInfoData: IDefinitionList[]

  @Input() isCohortValid: any

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}
}
