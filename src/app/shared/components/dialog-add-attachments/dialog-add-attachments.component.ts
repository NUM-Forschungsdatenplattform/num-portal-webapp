import { Component, EventEmitter, Inject, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AttachmentUploadProgress } from '../../models/attachment/attachment-upload-progress.interface'
import { AttachmentUploadStatus } from '../../models/attachment/attachment-upload-status.enum'
import { IGenericDialog } from '../../models/generic-dialog.interface'

export interface FileInputControl {
  fileName: FormControl<string>
  description: FormControl<string>
}

export interface UploadDialogData {
  projectId: number
}

@Component({
  selector: 'num-dialog-add-attachments',
  templateUrl: './dialog-add-attachments.component.html',
  styleUrls: ['./dialog-add-attachments.component.scss'],
})
export class DialogAddAttachmentsComponent implements IGenericDialog<UploadDialogData> {
  @Output() closeDialog = new EventEmitter<{ file: File; description?: string } | void>()

  attachmentUploadStatus = AttachmentUploadStatus
  dialogInput: UploadDialogData
  file?: File
  formGroup: FormGroup<FileInputControl>
  uploadProgress$: Observable<AttachmentUploadProgress>

  constructor(
    private attachmentService: AttachmentService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogConfig,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group<FileInputControl>({
      description: this.fb.nonNullable.control<string>(''),
      fileName: this.fb.nonNullable.control<string>(
        { value: '', disabled: true },
        { validators: [Validators.required] }
      ),
    })

    this.uploadProgress$ = this.attachmentService.uploadProgressObservable$
  }

  handleFileSelect(event: InputEvent): void {
    this.file = (event.target as HTMLInputElement).files.item(0)
    this.formGroup.patchValue({ fileName: this.file.name })
  }

  handleDialogCancel() {
    this.formGroup.reset()
    this.closeDialog.emit()
  }

  handleDialogConfirm() {
    if (this.formGroup.valid && this.formGroup.get('fileName').value !== '') {
      const { description } = this.formGroup.getRawValue()
      this.attachmentService
        .uploadAttachment(this.dialogInput.projectId, this.file, description)
        .subscribe((result) => {
          if (result) {
            this.formGroup.reset()
            this.closeDialog.emit({ description, file: this.file })
          }
        })
    }
  }
}
