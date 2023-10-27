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
import { ApprovalOption } from '../../models/approval-option.enum'
import { AvailableRoles } from '../../../../shared/models/available-roles.enum'
import { PossibleProjectEditorMode } from '../../../../shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from '../../../../shared/models/project/project-status.enum'

@Component({
  selector: 'num-project-editor-buttons',
  templateUrl: './project-editor-buttons.component.html',
  styleUrls: ['./project-editor-buttons.component.scss'],
})
export class ProjectEditorButtonsComponent {
  availableRoles = AvailableRoles
  possibleModes = PossibleProjectEditorMode
  possibleStatus = ProjectStatus
  constructor() {}

  @Input() editorMode: PossibleProjectEditorMode
  @Input() projectStatus: ProjectStatus
  @Input() isFormValid: boolean
  @Input() isResearchersDefined: boolean
  @Input() isTemplatesDefined: boolean
  @Input() isCohortDefined: boolean
  @Input() isCohortValid: boolean
  @Input() approverForm: FormGroup
  @Input() isExportLoading: boolean
  @Input() isSavedProject: boolean
  @Input() isUserProjectAdmin: boolean

  @Output() saveAll = new EventEmitter()
  @Output() saveResearchers = new EventEmitter()
  @Output() saveAsApprovalRequest = new EventEmitter()
  @Output() saveAsApprovalReply = new EventEmitter()
  @Output() startEdit = new EventEmitter()
  @Output() cancel = new EventEmitter()
  @Output() exportPrint = new EventEmitter()

  get approvalDecision(): ApprovalOption {
    return this.approverForm.value.decision
  }
}
