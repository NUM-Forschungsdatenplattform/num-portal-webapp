import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ApprovalOption } from '../../models/approval-option.enum'

@Component({
  selector: 'num-study-editor-approval',
  templateUrl: './study-editor-approval.component.html',
  styleUrls: ['./study-editor-approval.component.scss'],
})
export class StudyEditorApprovalComponent implements OnInit {
  constructor() {}

  @Input() form: FormGroup

  approvalOptions = Object.values(ApprovalOption)

  ngOnInit(): void {}
}
