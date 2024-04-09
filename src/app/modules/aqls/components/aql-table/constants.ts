import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogSize } from '../../../../shared/models/dialog/dialog-size.enum'
import { DialogConfirmationComponent } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.component'

export const DELETE_APPROVAL_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.DELETE_QUERY_TITLE',
  confirmButtonText: 'BUTTON.DELETE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,
  dialogContentComponent: DialogConfirmationComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.DELETE_QUERY_CONTENT',
}
