import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogSize } from '../../../../shared/models/dialog/dialog-size.enum'
import { DialogAddTemplateComponent } from '../dialog-add-template/dialog-add-template.component'

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'AVAILABLE_EHR_TEMPLATES',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,
  dialogContentComponent: DialogAddTemplateComponent,

  dialogContentPayload: undefined,
}
