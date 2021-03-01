import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

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
