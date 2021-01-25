import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PossibleStudyEditorMode } from 'src/app/shared/models/study/possible-study-editor-mode.enum'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { ApprovalOption } from '../../models/approval-option.enum'

@Component({
  selector: 'num-study-editor-buttons',
  templateUrl: './study-editor-buttons.component.html',
  styleUrls: ['./study-editor-buttons.component.scss'],
})
export class StudyEditorButtonsComponent implements OnInit {
  possibleModes = PossibleStudyEditorMode
  possibleStatus = StudyStatus
  constructor() {}

  @Input() editorMode: PossibleStudyEditorMode
  @Input() studyStatus: StudyStatus
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
