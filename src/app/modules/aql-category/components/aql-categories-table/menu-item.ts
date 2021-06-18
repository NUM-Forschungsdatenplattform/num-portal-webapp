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

import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
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
