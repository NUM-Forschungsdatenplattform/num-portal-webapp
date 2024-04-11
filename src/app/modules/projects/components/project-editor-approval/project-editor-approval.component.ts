import { Component, Input } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { ApprovalOption } from '../../models/approval-option.enum'

@Component({
  selector: 'num-project-editor-approval',
  templateUrl: './project-editor-approval.component.html',
  styleUrls: ['./project-editor-approval.component.scss'],
})
export class ProjectEditorApprovalComponent {
  constructor() {}

  @Input() form: UntypedFormGroup

  approvalOptions = Object.values(ApprovalOption)
}
