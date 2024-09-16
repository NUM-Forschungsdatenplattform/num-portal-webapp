import { ToastMessageService } from './toast-message.service'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { Subject } from 'rxjs'

describe('ToastMessageService', () => {
  let service: ToastMessageService

  const translatedText = 'translatedText'

  const toastConfig: IToastMessageConfig = {
    message: 'Hello World',
    type: ToastMessageType.Success,
    duration: 5000,
  }

  const snackbarCallOptions: MatSnackBarConfig = {
    duration: toastConfig.duration,
    panelClass: ['num-toast', `num-toast-${toastConfig.type}`],
    verticalPosition: 'top',
  }

  const closeActionSubject$ = new Subject<void>()

  // Mock für MatSnackBar
  const mockSnackbar = {
    open: jest.fn().mockReturnValue({
      onAction: () => closeActionSubject$,
    }),
  } as unknown as MatSnackBar

  // Mock für TranslateService
  const mockTranslateService = {
    instant: jest.fn().mockReturnValue(translatedText),
  } as unknown as TranslateService

  beforeEach(() => {
    service = new ToastMessageService(mockSnackbar, mockTranslateService)
  })

  it('should call MatSnackBar open method with correct arguments', () => {
    service.openToast(toastConfig)
    expect(mockSnackbar.open).toHaveBeenCalledWith(translatedText, null, snackbarCallOptions)
  })

  it('should run the callback and then dismiss the toast if there is a callback', () => {
    let didCallbackRun = false
    const callbackToastConfig: IToastMessageConfig = {
      ...toastConfig,
      callback: () => (didCallbackRun = true),
      callbackButtonLabel: 'text',
      duration: undefined,
    }

    service.openToast(callbackToastConfig)
    closeActionSubject$.next()

    expect(didCallbackRun).toBeTruthy()
  })
})
