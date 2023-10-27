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


export const CREATION_SUCCESS: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.CREATION_SUCCESS',
  type: ToastMessageType.Success,
}

export const CREATION_ERROR: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.CREATION_ERROR',
  type: ToastMessageType.Error,
}

export const UPDATING_SUCCESS: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.UPDATING_SUCCESS',
  type: ToastMessageType.Success,
}

export const UPDATING_ERROR: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.UPDATING_ERROR',
  type: ToastMessageType.Error,
}

export const ADDING_DOMAIN_SUCCESS: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.ADDING_DOMAIN_SUCCESS',
  type: ToastMessageType.Success,
}

export const ADDING_DOMAIN_ERROR_GENERIC: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.ADDING_DOMAIN_ERROR_GENERIC',
  type: ToastMessageType.Error,
}

export const ADDING_DOMAIN_ERROR_TAKEN: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.ADDING_DOMAIN_ERROR_TAKEN',
  type: ToastMessageType.Error,
}

export const DELETING_DOMAIN_SUCCESS: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.DELETING_DOMAIN_SUCCESS',
  type: ToastMessageType.Success,
}

export const DELETING_DOMAIN_ERROR: IToastMessageConfig = {
  message: 'ORGANIZATION_MANAGEMENT.DELETING_DOMAIN_ERROR',
  type: ToastMessageType.Error,
}
