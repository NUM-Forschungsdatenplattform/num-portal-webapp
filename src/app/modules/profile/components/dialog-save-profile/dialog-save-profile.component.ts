import { Component, EventEmitter, Output } from '@angular/core'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-dialog-save-profile',
  templateUrl: './dialog-save-profile.component.html',
  styleUrls: ['./dialog-save-profile.component.scss'],
  imports: [TranslatePipe],
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
