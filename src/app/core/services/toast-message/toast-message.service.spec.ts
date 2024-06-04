import { ToastMessageService } from './toast-message.service'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { Subject } from 'rxjs'

describe('ToastService', () => {
  let service: ToastMessageService

  const translatedText = 'translatedText'

  const toastConfig: IToastMessageConfig = {
    message: 'Hello World',
    type: ToastMessageType.Success,
    duration: 5000,
  }

  const snackbarCallOptions = {
    duration: toastConfig.duration,
    panelClass: ['num-toast', `num-toast-${toastConfig.type}`],
    verticalPosition: 'top',
  } as MatSnackBarConfig

  const closeActionSubject$ = new Subject<void>()
  const mockSnackbar = {
    open: jest.fn().mockImplementation(() => {
      return {
        onAction: () => closeActionSubject$,
      }
    }),
  } as unknown as MatSnackBar

  const mockTranslateService = {
    instant: jest.fn(),
  } as unknown as TranslateService

  beforeEach(() => {
    service = new ToastMessageService(mockSnackbar, mockTranslateService)
    jest.spyOn(mockTranslateService, 'instant').mockImplementation(() => translatedText)
  })

  it('should run #openToast()', async () => {
    service.openToast(toastConfig)
    expect(mockSnackbar.open).toHaveBeenCalledWith(translatedText, null, snackbarCallOptions)
  })

  it('should run the callback and then dismiss the toast, if there is a callback', async () => {
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
