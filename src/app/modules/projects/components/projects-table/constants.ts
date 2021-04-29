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
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogConfirmProjectComponent } from '../dialog-confirm-project/dialog-confirm-project.component'

export const WITHDRAW_APPROVAL_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.WITHDRAW_APPROVAL_TITLE',
  confirmButtonText: 'BUTTON.WITHDRAW_APPROVAL',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmProjectComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.WITHDRAW_APPROVAL_CONTENT',
}

export const CLOSE_PROJECT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.CLOSE_PROJECT_TITLE',
  confirmButtonText: 'BUTTON.FINISH_PROJECT',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmProjectComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.FINISH_PROJECT_CONTENT',
}

export const PUBLISH_PROJECT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.PUBLISH_PROJECT_TITLE',
  confirmButtonText: 'BUTTON.PUBLISH',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmProjectComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.PUBLISH_PROJECT_CONTENT',
}

export const ARCHIVE_PROJECT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.ARCHIVE_PROJECT_TITLE',
  confirmButtonText: 'BUTTON.ARCHIVE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmProjectComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.ARCHIVE_PROJECT_CONTENT',
}

export const DELETE_PROJECT_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.DELETE_PROJECT_TITLE',
  confirmButtonText: 'BUTTON.DELETE',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmProjectComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.DELETE_PROJECT_CONTENT',
}

export const CHANGE_STATUS_SUCCESS: IToastMessageConfig = {
  message: 'PROJECT.CHANGE_STATUS_SUCCESS',
  type: ToastMessageType.Success,
}

export const CHANGE_STATUS_ERROR: IToastMessageConfig = {
  message: 'PROJECT.CHANGE_STATUS_ERROR',
  type: ToastMessageType.Error,
}
