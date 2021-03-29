import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ApprovalOption } from '../../models/approval-option.enum'

@Component({
  selector: 'num-project-editor-buttons',
  templateUrl: './project-editor-buttons.component.html',
  styleUrls: ['./project-editor-buttons.component.scss'],
})
export class ProjectEditorButtonsComponent implements OnInit {
  possibleModes = PossibleProjectEditorMode
  possibleStatus = ProjectStatus
  constructor() {}

  @Input() editorMode: PossibleProjectEditorMode
  @Input() projectStatus: ProjectStatus
  @Input() isFormValid: boolean
  @Input() isResearchersDefined: boolean
  @Input() isTemplatesDefined: boolean
  @Input() isCohortDefined: boolean
  @Input() approverForm: FormGroup

  @Output() saveAll = new EventEmitter()
  @Output() saveResearchers = new EventEmitter()
  @Output() saveAsApprovalRequest = new EventEmitter()
  @Output() saveAsApprovalReply = new EventEmitter()
  @Output() startEdit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  ngOnInit(): void {}

  get approvalDecision(): ApprovalOption {
    return this.approverForm.value.decision
  }
}
