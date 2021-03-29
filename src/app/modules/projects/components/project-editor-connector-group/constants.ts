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

import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

export const EDIT_DIALOG_CONFIG: DialogConfig = {
  title: 'EDIT_PHENOTYPE_PARAMETER',
  confirmButtonText: 'BUTTON.CONFIRM_CHANGES',
  cancelButtonText: 'BUTTON.DELETE_FROM_LIST',
  dialogSize: DialogSize.Medium,
  hasCloseIcon: true,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}

export const ADD_DIALOG_CONFIG: DialogConfig = {
  title: 'AVAILABLE_PHENOTYPES',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Medium,

  dialogContentComponent: undefined,
  dialogContentPayload: undefined,
}
