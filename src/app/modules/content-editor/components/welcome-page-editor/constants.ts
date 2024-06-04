import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogEditWelcomeCardComponent } from '../dialog-edit-welcome-card/dialog-edit-welcome-card.component'

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'CONTENT_EDITOR.ADD_CARD_DIALOG_HEADER',
  dialogSize: DialogSize.Medium,
  hideGenericButtons: true,

  dialogContentComponent: DialogEditWelcomeCardComponent,
  dialogContentPayload: undefined,
}

export const SAVE_ERROR_CONFIG: IToastMessageConfig = {
  message: 'CONTENT_EDITOR.SAVE_CARDS_ERROR',
  type: ToastMessageType.Error,
}

export const SAVE_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'CONTENT_EDITOR.SAVE_CARDS_SUCCESS',
  type: ToastMessageType.Success,
}
