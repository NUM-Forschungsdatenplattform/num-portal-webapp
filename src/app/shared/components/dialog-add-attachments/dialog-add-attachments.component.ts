import { Component, EventEmitter, Inject, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IGenericDialog } from '../../models/generic-dialog.interface'

export interface FileInputControl {
  file: FormControl<File>
  description: FormControl<string>
}

@Component({
  selector: 'num-dialog-add-attachments',
  templateUrl: './dialog-add-attachments.component.html',
  styleUrls: ['./dialog-add-attachments.component.scss'],
})
export class DialogAddAttachmentsComponent implements IGenericDialog<void> {
  @Output() closeDialog = new EventEmitter<{ file: File; description?: string } | void>()
  formGroup: FormGroup<FileInputControl>

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogConfig,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      file: this.fb.control<File>(null, { validators: [Validators.required] }),
      description: this.fb.control<string>(null),
    })
  }
  dialogInput: void

  handleDialogCancel() {
    this.formGroup.reset()
    this.closeDialog.emit()
  }

  handleDialogConfirm() {
    this.closeDialog.emit(this.formGroup.getRawValue())
    this.formGroup.reset()
  }
}
