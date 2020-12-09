import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'APPROVE_USER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPROVE_USER',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
