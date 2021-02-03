import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

enum ToastType {
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
}

interface ITaostConfig {
  type?: ToastType
  button?: string
  duration?: number // 0 for infinite duration
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

  public openToast(
    message: string,
    config?: ITaostConfig,
    callback?: () => void
  ): MatSnackBarRef<any> {
    if (!message) {
      return
    }

    const type = config.type ? config.type : 'success'
    const translatedMessage = this.translate.instant(message)
    const translatedAction = config.button ? this.translate.instant(config.button) : null

    const snackbar = this.snackbar.open(translatedMessage, translatedAction, {
      duration: config.duration ? config.duration : 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['num-toast', `num-toast-${type}`],
    })

    snackbar.dismissWithAction = () => {
      callback()
      snackbar.dismiss()
    }

    return snackbar
  }
}
