import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ApprovalOption } from '../../models/approval-option.enum'

@Component({
  selector: 'num-study-editor-approval',
  templateUrl: './project-editor-approval.component.html',
  styleUrls: ['./project-editor-approval.component.scss'],
})
export class ProjectEditorApprovalComponent implements OnInit {
  constructor() {}

  @Input() form: FormGroup

  approvalOptions = Object.values(ApprovalOption)

  ngOnInit(): void {}
}
