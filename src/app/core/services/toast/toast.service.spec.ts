import { Injectable } from '@angular/core'

import { ToastService } from './toast.service'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

@Injectable()
class MockTranslateService {}

describe('ToastService', () => {
  let service

  const toast = ({
    open: () => ({} as MatSnackBarRef<any>),
  } as unknown) as MatSnackBar

  const mockTranslateService = ({
    instant: jest.fn(),
  } as unknown) as TranslateService

  beforeEach(() => {
    service = new ToastService(toast, mockTranslateService)
    jest.spyOn(mockTranslateService, 'instant').mockImplementation(() => 'test')
    service.snackbar = service.snackbar || {}
    service.snackbar.open = jest.fn().mockReturnValue({
      dismissWithAction: {},
    })
  })

  it('should run #openToast()', async () => {
    service.openToast('Hello Toast', {})
    expect(service.snackbar.open).toHaveBeenCalledTimes(1)
  })

  it('should NOT run #openToast() if no message', async () => {
    service.openToast()
    expect(service.snackbar.open).toHaveBeenCalledTimes(0)
  })

  it('should run the callback and then dismiss the toast, if there is a callback', async () => {
    let didCallbackRun = false

    const snackbar = service.openToast('hello Toast', {}, () => {
      didCallbackRun = true
    })

    snackbar.dismiss = jest.fn().mockReturnValue({})
    snackbar.dismissWithAction()

    expect(didCallbackRun).toBeTruthy()
    expect(snackbar.dismiss).toHaveBeenCalledTimes(1)
  })
})
