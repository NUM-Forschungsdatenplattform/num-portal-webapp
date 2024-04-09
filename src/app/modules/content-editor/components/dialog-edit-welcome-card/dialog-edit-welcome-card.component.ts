import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { cloneDeep } from 'lodash-es'
import { DASHBOARD_CARD_IMAGES, DEFAULT_DASHBOARD_CARD_IMAGE } from 'src/app/shared/constants'

@Component({
  selector: 'num-dialog-edit-welcome-card',
  templateUrl: './dialog-edit-welcome-card.component.html',
  styleUrls: ['./dialog-edit-welcome-card.component.scss'],
})
export class DialogEditWelcomeCardComponent implements OnInit, IGenericDialog<UntypedFormGroup> {
  constructor() {}
  images = DASHBOARD_CARD_IMAGES
  defaultImage = DEFAULT_DASHBOARD_CARD_IMAGE

  dialogInput: UntypedFormGroup
  form: UntypedFormGroup
  @Output() closeDialog = new EventEmitter()

  ngOnInit(): void {
    this.form = cloneDeep(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.form)
  }
}
