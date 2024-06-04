import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ApprovalOption } from '../../models/approval-option.enum'

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
  @Input() approverForm: UntypedFormGroup
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
