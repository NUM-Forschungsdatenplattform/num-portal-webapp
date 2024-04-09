import { Component, EventEmitter } from '@angular/core'
import { IGenericDialog } from '../../models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements IGenericDialog<string> {
  dialogInput: string
  closeDialog = new EventEmitter<boolean>()

  constructor() {}

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }
  handleDialogConfirm(): void {
    this.closeDialog.emit(true)
  }
}
