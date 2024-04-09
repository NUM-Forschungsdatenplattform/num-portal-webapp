import { IItemVisibility } from '../../../../shared/models/item-visibility.interface'

export enum AqlCategoryMenuKeys {
  Edit = 'EDIT',
  Delete = 'DELETE',
}

export const MENU_ITEM_EDIT: IItemVisibility = {
  id: AqlCategoryMenuKeys.Edit,
  translationKey: 'BUTTON.EDIT',
  disabledUnless: [],
  hiddenWhen: [],
}

export const MENU_ITEM_DELETE: IItemVisibility = {
  id: AqlCategoryMenuKeys.Delete,
  translationKey: 'BUTTON.DELETE',
  disabledUnless: [],
  hiddenWhen: [],
}
