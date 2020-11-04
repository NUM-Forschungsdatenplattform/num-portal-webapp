import { DialogContentData } from './dialog-content-data.interface'
import { DialogSize } from './dialog-size.enum'

export interface DialogConfigData {
  dialogContentComponent: any
  dialogContentData: DialogContentData
  dialogSize: DialogSize
}
