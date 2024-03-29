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
