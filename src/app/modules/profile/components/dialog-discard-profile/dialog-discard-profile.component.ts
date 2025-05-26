import { Component, EventEmitter, Output } from '@angular/core'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-dialog-discard-profile',
  templateUrl: './dialog-discard-profile.component.html',
  styleUrls: ['./dialog-discard-profile.component.scss'],
  imports: [TranslatePipe],
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
