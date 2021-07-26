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

import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogAqlBuilderComponent } from 'src/app/modules/aqls/components/dialog-aql-builder/dialog-aql-builder.component'

export const COMPOSITION_LOADING_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.CONFIGURATION_ERROR',
  type: ToastMessageType.Error,
}

export const RESULT_SET_LOADING_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.RESULT_SET_ERROR',
  type: ToastMessageType.Error,
}

export const EXPORT_ERROR: IToastMessageConfig = {
  message: 'DATA_EXPLORER.EXPORT_ERROR',
  type: ToastMessageType.Error,
}

export const BUILDER_DIALOG_CONFIG: DialogConfig = {
  title: 'DATA_EXPLORER.QUERY_BUILDER_DIALOG_HEADER',
  confirmButtonText: 'BUTTON.APPLY_SELECTION',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Large,
  hideGenericButtons: true,

  dialogContentComponent: DialogAqlBuilderComponent,
  dialogContentPayload: undefined,
}
