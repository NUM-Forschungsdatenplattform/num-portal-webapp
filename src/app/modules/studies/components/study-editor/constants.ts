import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogConfirmStudyApprovalComponent } from '../dialog-confirm-study-approval/dialog-confirm-study-approval.component'

export const APPROVE_STUDY_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.APPROVE_STUDY_TITLE',
  confirmButtonText: 'BUTTON.APPROVE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,
  hideGenericButtons: true,

  dialogContentComponent: DialogConfirmStudyApprovalComponent,
  dialogContentPayload: undefined,
}
