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
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { GenericDialogComponent } from '../../components/generic-dialog/generic-dialog.component'
import { DialogConfig } from '../../../shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'

interface ISize {
  width: string
  maxWidth: string
  maxHeight: string
  height?: string
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    dialogConfig: DialogConfig,
    disableClose: boolean = false
  ): MatDialogRef<GenericDialogComponent, any> {
    return this.dialog.open(GenericDialogComponent, {
      ...this.getSize(dialogConfig.dialogSize),
      data: dialogConfig,
      disableClose,
    })
  }

  private getSize(dialogSize: DialogSize): ISize {
    switch (dialogSize) {
      case DialogSize.Small:
        return {
          width: '95vw',
          maxWidth: '500px',
          maxHeight: '400px',
        }
      case DialogSize.Large:
        return {
          width: '98vw',
          maxWidth: '2000px',
          height: '98vh',
          maxHeight: '2000px',
        }
      case DialogSize.Medium:
      default:
        return {
          width: '95vw',
          maxWidth: '1000px',
          maxHeight: '800px',
        }
    }
  }
}
