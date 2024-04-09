import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const COOKIE_DIALOG_CONFIG: DialogConfig = {
  isDecision: true,
  title: 'LEGAL.COOKIE_WARNING_TITLE',
  confirmButtonText: 'BUTTON.ACCEPT',
  cancelButtonText: 'BUTTON.DECLINE',
  dialogSize: DialogSize.Small,
  dialogContentComponent: DialogConfirmationComponent,
  dialogContentPayload: 'LEGAL.COOKIE_WARNING_CONTENT',
}
