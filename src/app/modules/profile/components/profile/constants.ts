import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogDiscardProfileComponent } from '../dialog-discard-profile/dialog-discard-profile.component'
import { DialogSaveProfileComponent } from '../dialog-save-profile/dialog-save-profile.component'

export const SAVE_DIALOG_CONFIG: DialogConfig = {
  title: 'PROFILE.SAVE_DIALOG_HEADER',
  dialogSize: DialogSize.Small,
  hideGenericButtons: false,
  cancelButtonText: 'BUTTON.CANCEL',
  confirmButtonText: 'BUTTON.SAVE_CHANGES',
  isDecision: true,
  dialogContentComponent: DialogSaveProfileComponent,
  dialogContentPayload: undefined,
}

export const DISCARD_DIALOG_CONFIG: DialogConfig = {
  title: 'PROFILE.DISCARD_DIALOG_HEADER',
  dialogSize: DialogSize.Small,
  hideGenericButtons: false,
  cancelButtonText: 'BUTTON.CANCEL',
  confirmButtonText: 'BUTTON.DISCARD',
  isDecision: true,
  dialogContentComponent: DialogDiscardProfileComponent,
  dialogContentPayload: undefined,
}

export const SAVE_ERROR_CONFIG: IToastMessageConfig = {
  message: 'PROFILE.SAVE_ERROR',
  type: ToastMessageType.Error,
}

export const SAVE_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'PROFILE.SAVE_SUCCESS',
  type: ToastMessageType.Success,
}
