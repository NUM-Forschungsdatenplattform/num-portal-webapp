import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogConfirmProjectApprovalComponent } from '../dialog-confirm-project-approval/dialog-confirm-project-approval.component'

export const APPROVE_PROJECT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.APPROVE_PROJECT_TITLE',
  confirmButtonText: 'BUTTON.APPROVE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,
  hideGenericButtons: true,

  dialogContentComponent: DialogConfirmProjectApprovalComponent,
  dialogContentPayload: undefined,
}
