import { Component, EventEmitter, Output } from '@angular/core'
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatCheckbox } from '@angular/material/checkbox'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-dialog-confirm-project-approval',
  templateUrl: './dialog-confirm-project-approval.component.html',
  styleUrls: ['./dialog-confirm-project-approval.component.scss'],
  imports: [
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckbox,
    ButtonComponent,
    TranslatePipe,
  ],
})
export class DialogConfirmProjectApprovalComponent implements IGenericDialog<never> {
  constructor() {}

  @Output() closeDialog = new EventEmitter()
  dialogInput: never

  form = new UntypedFormGroup({
    check: new UntypedFormControl(false, [Validators.requiredTrue]),
  })

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(true)
  }
}
