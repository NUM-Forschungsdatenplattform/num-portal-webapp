import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

export const RESOLVE_ERROR_CONFIG: IToastMessageConfig = {
  message: 'MANAGER_TOOLS.RESOLVE_PSEUDONYM_ERROR',
  type: ToastMessageType.Error,
}

export const COPY_CLIPBOARD_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'MANAGER_TOOLS.COPY_CLIPBOARD_SUCCESS',
  type: ToastMessageType.Success,
}
