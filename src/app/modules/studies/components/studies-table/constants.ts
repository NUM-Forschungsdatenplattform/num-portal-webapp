import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { DialogConfirmStudyComponent } from '../dialog-confirm-study/dialog-confirm-study.component'

export const WITHDRAW_APPROVAL_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.WITHDRAW_APPROVAL_TITLE',
  confirmButtonText: 'BUTTON.WITHDRAW_APPROVAL',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmStudyComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.WITHDRAW_APPROVAL_CONTENT',
}

export const CLOSE_STUDY_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.CLOSE_STUDY_TITLE',
  confirmButtonText: 'BUTTON.CLOSE_STUDY',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmStudyComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.CLOSE_STUDY_CONTENT',
}

export const PUBLISH_STUDY_DIALOG_CONFIG: DialogConfig = {
  title: 'CONFIRM_DIALOG.PUBLISH_STUDY_TITLE',
  confirmButtonText: 'BUTTON.PUBLISH',
  cancelButtonText: 'BUTTON.CANCEL',
  dialogSize: DialogSize.Small,
  hasCloseIcon: false,

  dialogContentComponent: DialogConfirmStudyComponent,
  dialogContentPayload: 'CONFIRM_DIALOG.PUBLISH_STUDY_CONTENT',
}
