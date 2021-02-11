import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

export const COMPILE_ERROR_CONFIG: IToastMessageConfig = {
  message: 'AQL.COMPILE_ERROR_MESSAGE',
  type: ToastMessageType.Error,
}
