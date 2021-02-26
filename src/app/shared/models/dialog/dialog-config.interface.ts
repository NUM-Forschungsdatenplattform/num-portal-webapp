import { DialogSize } from './dialog-size.enum'

export interface DialogConfig {
  dialogContentComponent: any
  dialogContentPayload?: any
  dialogSize: DialogSize
  title: string
  hasCloseIcon?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  isDecision?: boolean
  hideGenericButtons?: boolean
}
