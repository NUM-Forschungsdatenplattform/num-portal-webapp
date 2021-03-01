import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

  public openToast(config: IToastMessageConfig): MatSnackBarRef<any> {
    const translatedMessage = this.translate.instant(config.message, config.messageParameters)
    const translatedAction = config.callbackButtonLabel
      ? this.translate.instant(config.callbackButtonLabel)
      : null

    const snackbarRef = this.snackbar.open(translatedMessage, translatedAction, {
      duration: config.duration >= 0 ? config.duration : 4000,
      panelClass: ['num-toast', `num-toast-${config.type}`],
      verticalPosition: 'top',
    })

    if (config.callback && config.callbackButtonLabel) {
      snackbarRef.onAction().subscribe(() => {
        config.callback()
      })
    }

    return snackbarRef
  }
}
