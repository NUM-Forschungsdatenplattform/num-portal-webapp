import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

export const SAVE_NAVIGATION_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'CONTENT_EDITOR.SAVE_NAVIGATION_SUCCESS',
  type: ToastMessageType.Success,
}

export const SAVE_NAVIGATION_ERROR_CONFIG: IToastMessageConfig = {
  message: 'CONTENT_EDITOR.SAVE_NAVIGATION_ERROR',
  type: ToastMessageType.Error,
}
