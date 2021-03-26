import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogSize } from '../../../../shared/models/dialog/dialog-size.enum'

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'AVAILABLE_EHR_TEMPLATES',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
