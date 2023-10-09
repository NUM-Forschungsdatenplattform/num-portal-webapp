import { Component, EventEmitter, Output } from '@angular/core'
import { IGenericDialog } from 'projects/num-lib/src/lib/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-discard-profile',
  templateUrl: './dialog-discard-profile.component.html',
  styleUrls: ['./dialog-discard-profile.component.scss'],
})
export class DialogDiscardProfileComponent implements IGenericDialog<never> {
  constructor() {}

  dialogInput: never
  @Output() closeDialog = new EventEmitter<boolean>()

  handleDialogConfirm = () => {
    this.closeDialog.emit(true)
  }
  handleDialogCancel = () => {
    this.closeDialog.emit(false)
  }
}
