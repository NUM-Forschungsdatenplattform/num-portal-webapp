import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IItemVisibility } from '../../../../shared/models/item-visibility.interface'

export enum AqlOwner {
  MyAql = 'MY_AQL',
  OtherAql = 'OTHER_AQLS',
}

export enum AqlMenuKeys {
  Edit = 'EDIT',
  Clone = 'CLONE',
  Delete = 'DELETE',
}

export const MENU_ITEM_EDIT: IItemVisibility = {
  id: AqlMenuKeys.Edit,
  translationKey: 'BUTTON.EDIT',
  disabledUnless: [],
  hiddenWhen: [AqlOwner.OtherAql],
}

export const MENU_ITEM_CLONE: IItemVisibility = {
  id: AqlMenuKeys.Clone,
  translationKey: 'BUTTON.CLONE',
  disabledUnless: [],
  hiddenWhen: [AqlOwner.MyAql],
}

export const MENU_ITEM_DELETE: IItemVisibility = {
  id: AqlMenuKeys.Delete,
  translationKey: 'BUTTON.DELETE',
  forceEnableByRole: [AvailableRoles.SuperAdmin],
  disabledUnless: [AqlOwner.OtherAql],
  hiddenWhen: [],
}
