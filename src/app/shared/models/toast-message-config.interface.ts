import { ToastMessageType } from './toast-message-type.enum'

export interface IToastMessageConfig {
  type: ToastMessageType

  /**
   * The toast-messages text.
   * To be specified as a translation key
   */
  message: string

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
