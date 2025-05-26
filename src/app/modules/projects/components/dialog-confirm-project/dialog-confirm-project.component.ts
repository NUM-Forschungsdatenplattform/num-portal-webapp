import { Component, EventEmitter } from '@angular/core'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-dialog-confirm-project',
  templateUrl: './dialog-confirm-project.component.html',
  styleUrls: ['./dialog-confirm-project.component.scss'],
  imports: [TranslatePipe],
})
export class DialogConfirmProjectComponent implements IGenericDialog<string> {
  constructor() {}

  dialogInput: string
  closeDialog = new EventEmitter<boolean>()

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }
  handleDialogConfirm(): void {
    this.closeDialog.emit(true)
  }
}
