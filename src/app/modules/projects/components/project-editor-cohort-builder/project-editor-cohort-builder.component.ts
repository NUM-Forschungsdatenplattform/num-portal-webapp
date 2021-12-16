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
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-project-editor-cohort-builder',
  templateUrl: './project-editor-cohort-builder.component.html',
  styleUrls: ['./project-editor-cohort-builder.component.scss'],
})
export class ProjectEditorCohortBuilderComponent {
  @Input() cohortNode: CohortGroupUiModel
  @Input() isLoadingComplete: boolean
  @Input() isDisabled: boolean

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}
}
