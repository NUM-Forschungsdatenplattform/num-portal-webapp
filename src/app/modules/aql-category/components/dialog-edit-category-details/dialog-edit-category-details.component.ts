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
// Third-Party
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

// Data models
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-edit-category-details',
  templateUrl: './dialog-edit-category-details.component.html',
  styleUrls: ['./dialog-edit-category-details.component.scss'],
})
export class DialogEditCategoryDetailsComponent
  implements IGenericDialog<{ aqlCategory?: Omit<IAqlCategoryApi, 'id'> }>, OnInit {
  @Output() closeDialog = new EventEmitter<void | Omit<IAqlCategoryApi, 'id'>>()

  categoryForm: FormGroup
  dialogInput: { aqlCategory?: Omit<IAqlCategoryApi, 'id'> }
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      nameDe: [
        this.dialogInput?.aqlCategory?.name?.de || '',
        [Validators.required, Validators.minLength(2)],
      ],
      nameEn: [
        this.dialogInput?.aqlCategory?.name?.en || '',
        [Validators.required, Validators.minLength(2)],
      ],
    })
  }

  handleDialogConfirm(): void {
    if (this.categoryForm.valid) {
      this.closeDialog.emit({
        name: {
          de: this.categoryForm.get('nameDe').value,
          en: this.categoryForm.get('nameEn').value,
        },
      })
    }
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
