import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

export const AQL_LOADING_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.CONFIGURATION_ERROR',
  type: ToastMessageType.Error,
}

export const RESULT_SET_LOADING_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.RESULT_SET_ERROR',
  type: ToastMessageType.Error,
}

export const EXPORT_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.EXPORT_ERROR',
  type: ToastMessageType.Error,
}
