import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'

import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

export const BUILDER_DIALOG_CONFIG: DialogConfig = {
  title: 'QUERIES.QUERY_BUILDER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Large,
  hideGenericButtons: true,

  dialogContentComponent: DialogAqlBuilderComponent,
  dialogContentPayload: undefined,
}

export const VALIDATION_ERROR_CONFIG: IToastMessageConfig = {
  message: 'QUERIES.VALIDATION_ERROR',
  type: ToastMessageType.Error,
}

export const VALIDATION_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'QUERIES.VALIDATION_SUCCESS',
  type: ToastMessageType.Success,
}
