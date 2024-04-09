import { EventEmitter } from '@angular/core'

export interface IGenericDialog<T> {
  closeDialog: EventEmitter<any>
  dialogInput: T
  handleDialogConfirm: () => void
  handleDialogCancel: () => void
}
