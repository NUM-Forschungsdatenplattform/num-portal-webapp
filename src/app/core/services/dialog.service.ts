import { ComponentType } from '@angular/cdk/portal'
import { Injectable, TemplateRef } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component'
import { DialogConfig } from '../models/dialog-config.interface'
import { DialogContentData } from '../models/dialog-content-data.interface'
import { DialogSize } from '../models/dialog-size.enum'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog<T>(
    dialogContentComponent: ComponentType<T> | TemplateRef<T>,
    dialogContentData: DialogContentData,
    dialogSize: DialogSize
  ): MatDialogRef<GenericDialogComponent, any> {
    const dialogConfig: DialogConfig = {
      data: {
        dialogContentComponent,
        dialogContentData,
        dialogSize,
      },
    }
    return this.dialog.open(GenericDialogComponent, dialogConfig)
  }
}
