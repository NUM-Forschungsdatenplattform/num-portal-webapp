import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'EDIT_USER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.SAVE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
