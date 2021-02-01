import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-confirm-study-approval',
  templateUrl: './dialog-confirm-study-approval.component.html',
  styleUrls: ['./dialog-confirm-study-approval.component.scss'],
})
export class DialogConfirmStudyApprovalComponent implements OnInit, IGenericDialog<never> {
  constructor() {}

  @Output() closeDialog = new EventEmitter()
  dialogInput: never

  form = new FormGroup({
    check: new FormControl(false, [Validators.requiredTrue]),
  })

  ngOnInit(): void {}

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(true)
  }
}
