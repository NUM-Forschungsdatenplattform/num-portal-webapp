import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-aql-builder',
  templateUrl: './dialog-aql-builder.component.html',
  styleUrls: ['./dialog-aql-builder.component.scss'],
})
export class DialogAqlBuilderComponent implements OnInit, IGenericDialog<any> {
  constructor() {}

  dialogInput: any
  @Output() closeDialog = new EventEmitter()

  ngOnInit(): void {}

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
