import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'

export const BUILDER_DIALOG_CONFIG: DialogConfig = {
  title: 'AQL.AQL_BUILDER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Large,
  hideGenericButtons: true,

  dialogContentComponent: DialogAqlBuilderComponent,
  dialogContentPayload: undefined,
}
