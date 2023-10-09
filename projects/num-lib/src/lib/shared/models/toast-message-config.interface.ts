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

import { ToastMessageType } from './toast-message-type.enum'

export interface IToastMessageConfig {
  type: ToastMessageType

  /**
   * The toast-messages text.
   * To be specified as a translation key
   */
  message: string

  /**
   * InterpolateParams for the translate function.
   * Like: { key: value }
   */
  messageParameters?: object

  /**
   * The time in ms after the message will be automatically hidden.
   * 0 or null for infinite duration.
   * Defaults to 4000ms
   */
  duration?: number

  /**
   * The label for the callback button
   * To be specified as a translation key
   */
  callbackButtonLabel?: string

  /**
   * The callback function, after clicking the callback button
   */
  callback?: () => any
}
