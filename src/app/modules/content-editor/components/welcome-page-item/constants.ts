import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogEditWelcomeCardComponent } from '../dialog-edit-welcome-card/dialog-edit-welcome-card.component'

export const EDIT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONTENT_EDITOR.EDIT_CARD_DIALOG_HEADER',
  dialogSize: DialogSize.Medium,
  hideGenericButtons: true,

  dialogContentComponent: DialogEditWelcomeCardComponent,
  dialogContentPayload: undefined,
}
