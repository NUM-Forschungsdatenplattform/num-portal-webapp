import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogSize } from '../../../../shared/models/dialog/dialog-size.enum'
import { DialogEditCategoryDetailsComponent } from '../dialog-edit-category-details/dialog-edit-category-details.component'

export const EDIT_AQL_CATEGORY_DIALOG_CONFIG: DialogConfig = {
  title: 'QUERY_CATEGORIES.EDIT_DIALOG_TITLE',
  confirmButtonText: 'BUTTON.SAVE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,
  hasCloseIcon: true,
  dialogContentComponent: DialogEditCategoryDetailsComponent,
}
