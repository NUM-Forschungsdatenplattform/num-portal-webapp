import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component'
import { DialogConfig } from '../models/dialog-config.interface'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    dialogConfig: DialogConfig,
    disableClose: boolean = false
  ): MatDialogRef<GenericDialogComponent, any> {
    return this.dialog.open(GenericDialogComponent, { data: dialogConfig, disableClose })
  }
}
