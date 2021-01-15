import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const BUILDER_DIALOG_CONFIG: DialogConfig = {
  title: 'AQL_BUILDER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Large,
  hideGenericButtons: true,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
