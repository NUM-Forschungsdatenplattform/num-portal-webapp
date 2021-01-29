import { Component, EventEmitter, OnInit } from '@angular/core'
import { IGenericDialog } from '../../models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit, IGenericDialog<string> {
  dialogInput: string
  closeDialog = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }
  handleDialogConfirm(): void {
    this.closeDialog.emit(true)
  }
}
