import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const EDIT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIGURE_AQL_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.CONFIRM_CHANGES',
  cancelButtonText: 'BUTTON.DELETE_FROM_LIST',
  dialogSize: DialogSize.Medium,
  hasCloseIcon: true,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'ADD_AQL_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
