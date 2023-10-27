import { Component, EventEmitter, Output } from '@angular/core'
import { IGenericDialog } from '../../../../shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-save-profile',
  templateUrl: './dialog-save-profile.component.html',
  styleUrls: ['./dialog-save-profile.component.scss'],
})
export class DialogSaveProfileComponent implements IGenericDialog<never> {
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
