import { Component, Input } from '@angular/core'
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ApprovalOption } from '../../models/approval-option.enum'
import { MatCard } from '@angular/material/card'
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio'
import { FlexModule } from '@angular/flex-layout/flex'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-project-editor-approval',
  templateUrl: './project-editor-approval.component.html',
  styleUrls: ['./project-editor-approval.component.scss'],
  imports: [
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatRadioGroup,
    FlexModule,
    MatRadioButton,
    TranslatePipe,
  ],
})
export class ProjectEditorApprovalComponent {
  constructor() {}

  @Input() form: UntypedFormGroup

  approvalOptions = Object.values(ApprovalOption)
}
