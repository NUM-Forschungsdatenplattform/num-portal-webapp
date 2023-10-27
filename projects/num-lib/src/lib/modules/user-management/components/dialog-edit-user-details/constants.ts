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

import { IToastMessageConfig } from "../../../../shared/models/toast-message-config.interface"
import { ToastMessageType } from "../../../../shared/models/toast-message-type.enum"


export const EDIT_USER_SUCCESS: IToastMessageConfig = {
  message: 'USER_MANAGEMENT.EDIT_USER_SUCCESS',
  type: ToastMessageType.Success,
}

export const APPROVE_USER_SUCCESS: IToastMessageConfig = {
  message: 'USER_MANAGEMENT.APPROVE_USER_SUCCESS',
  type: ToastMessageType.Success,
}

export const EDIT_USER_ERROR: IToastMessageConfig = {
  message: 'USER_MANAGEMENT.EDIT_USER_ERROR',
  type: ToastMessageType.Error,
}

export const INVALID_USER_NAME_ERROR: IToastMessageConfig = {
  message: 'USER_MANAGEMENT.INVALID_USER_NAME_ERROR',
  type: ToastMessageType.Error,
}
