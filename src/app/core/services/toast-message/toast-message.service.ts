/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService,
  ) {}

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
