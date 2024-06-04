import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogAqlInfoComponent } from '../dialog-aql-info/dialog-aql-info.component'

export const INFO_DIALOG_CONFIG: DialogConfig = {
  title: 'QUERIES.INFO_DIALOG_TITLE',
  cancelButtonText: 'BUTTON.CANCEL',
  hasCloseIcon: true,
  dialogSize: DialogSize.Medium,

  dialogContentComponent: DialogAqlInfoComponent,
  dialogContentPayload: undefined,
}
