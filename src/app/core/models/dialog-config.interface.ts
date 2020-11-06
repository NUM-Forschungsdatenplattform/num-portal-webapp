import { DialogSize } from './dialog-size.enum'
import { ComponentType } from '@angular/cdk/portal'
import { TemplateRef } from '@angular/core'

export interface DialogConfig {
  dialogContentComponent: any
  dialogContentPayload?: any
  dialogSize: DialogSize
  title: string
  confirmButtonText?: string
  cancelButtonText?: string
}
