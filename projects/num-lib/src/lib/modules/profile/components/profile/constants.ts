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

import { DialogConfig } from 'projects/num-lib/src/lib/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'projects/num-lib/src/lib/shared/models/dialog/dialog-size.enum'
import { IToastMessageConfig } from 'projects/num-lib/src/lib/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'projects/num-lib/src/lib/shared/models/toast-message-type.enum'
import { DialogDiscardProfileComponent } from '../dialog-discard-profile/dialog-discard-profile.component'
import { DialogSaveProfileComponent } from '../dialog-save-profile/dialog-save-profile.component'

export const SAVE_DIALOG_CONFIG: DialogConfig = {
  title: 'PROFILE.SAVE_DIALOG_HEADER',
  dialogSize: DialogSize.Small,
  hideGenericButtons: false,
  cancelButtonText: 'BUTTON.CANCEL',
  confirmButtonText: 'BUTTON.SAVE_CHANGES',
  isDecision: true,
  dialogContentComponent: DialogSaveProfileComponent,
  dialogContentPayload: undefined,
}

export const DISCARD_DIALOG_CONFIG: DialogConfig = {
  title: 'PROFILE.DISCARD_DIALOG_HEADER',
  dialogSize: DialogSize.Small,
  hideGenericButtons: false,
  cancelButtonText: 'BUTTON.CANCEL',
  confirmButtonText: 'BUTTON.DISCARD',
  isDecision: true,
  dialogContentComponent: DialogDiscardProfileComponent,
  dialogContentPayload: undefined,
}

export const SAVE_ERROR_CONFIG: IToastMessageConfig = {
  message: 'PROFILE.SAVE_ERROR',
  type: ToastMessageType.Error,
}

export const SAVE_SUCCESS_CONFIG: IToastMessageConfig = {
  message: 'PROFILE.SAVE_SUCCESS',
  type: ToastMessageType.Success,
}
