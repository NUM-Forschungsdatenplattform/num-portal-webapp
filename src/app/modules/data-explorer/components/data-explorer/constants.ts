import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogAqlBuilderComponent } from 'src/app/modules/aqls/components/dialog-aql-builder/dialog-aql-builder.component'

export const COMPOSITION_LOADING_ERROR: IToastMessageConfig = {
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

export const BUILDER_DIALOG_CONFIG: DialogConfig = {
  title: 'DATA_EXPLORER.QUERY_BUILDER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Large,
  hideGenericButtons: true,

  dialogContentComponent: DialogAqlBuilderComponent,
  dialogContentPayload: undefined,
}
