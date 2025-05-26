// Third-Party
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'

// Data models
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-dialog-edit-category-details',
  templateUrl: './dialog-edit-category-details.component.html',
  styleUrls: ['./dialog-edit-category-details.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, TranslatePipe],
})
export class DialogEditCategoryDetailsComponent
  implements IGenericDialog<{ aqlCategory?: Omit<IAqlCategoryApi, 'id'> }>, OnInit
{
  @Output() closeDialog = new EventEmitter<void | Omit<IAqlCategoryApi, 'id'>>()

  categoryForm: UntypedFormGroup
  dialogInput: { aqlCategory?: Omit<IAqlCategoryApi, 'id'> }
  constructor(private formBuilder: UntypedFormBuilder) {}

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
