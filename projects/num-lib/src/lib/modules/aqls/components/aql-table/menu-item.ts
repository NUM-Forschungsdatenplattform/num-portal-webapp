/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AvailableRoles } from '../../../../shared/models/available-roles.enum'
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
