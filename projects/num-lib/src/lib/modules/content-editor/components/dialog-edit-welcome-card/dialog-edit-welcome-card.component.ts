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

import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { cloneDeep } from 'lodash-es'
import { DASHBOARD_CARD_IMAGES, DEFAULT_DASHBOARD_CARD_IMAGE } from 'projects/num-lib/src/lib/shared/constants'
import { IGenericDialog } from 'projects/num-lib/src/lib/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-edit-welcome-card',
  templateUrl: './dialog-edit-welcome-card.component.html',
  styleUrls: ['./dialog-edit-welcome-card.component.scss'],
})
export class DialogEditWelcomeCardComponent implements OnInit, IGenericDialog<FormGroup> {
  constructor() {}
  images = DASHBOARD_CARD_IMAGES
  defaultImage = DEFAULT_DASHBOARD_CARD_IMAGE

  dialogInput: FormGroup
  form: FormGroup
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
