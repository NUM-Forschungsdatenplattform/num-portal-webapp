import { Injectable } from '@angular/core'
import { Observable, of as observableOf, throwError } from 'rxjs'

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

  beforeEach(() => {
    service = new ToastService(toast, {})
  })

  it('should run #openToast()', async () => {
    service.translate = service.translate || {}
    service.translate.instant = jest.fn()
    service.snackbar = service.snackbar || {}
    service.snackbar.open = jest.fn().mockReturnValue({
      dismissWithAction: {},
    })
    service.openToast('Hello Toast', {}, {})
    // expect(service.translate.instant).toHaveBeenCalled();
    // expect(service.snackbar.open).toHaveBeenCalled();
  })
})
