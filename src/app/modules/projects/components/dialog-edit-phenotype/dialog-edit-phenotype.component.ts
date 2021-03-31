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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { cloneDeep } from 'lodash-es'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-dialog-edit-phenotype',
  templateUrl: './dialog-edit-phenotype.component.html',
  styleUrls: ['./dialog-edit-phenotype.component.scss'],
})
export class DialogEditPhenotypeComponent implements OnInit, IGenericDialog<PhenotypeUiModel> {
  constructor(private formBuilder: FormBuilder) {}

  @Output() closeDialog = new EventEmitter()
  dialogInput: PhenotypeUiModel
  phenotype: PhenotypeUiModel
  queryHighlighted: string
  parameterForm: FormGroup
  get formParameters(): FormArray {
    return this.parameterForm.get('parameters') as FormArray
  }

  ngOnInit(): void {
    this.phenotype = cloneDeep(this.dialogInput)

    if (this.phenotype.parameter.length) {
      this.generateParameterForm()
    }
  }

  generateParameterForm(): void {
    this.parameterForm = this.formBuilder.group({
      parameters: this.formBuilder.array([]),
    })

    this.phenotype.parameter.forEach((parameter) => {
      this.formParameters.push(this.buildFormInput(parameter))
    })
  }

  buildFormInput(parameter: { name: string; value?: string }): FormGroup {
    return this.formBuilder.group({
      parameter: parameter.value,
    })
  }

  handleDialogConfirm(): void {
    if (this.phenotype.parameter.length) {
      const values = this.formParameters.value as { parameter: any }[]
      this.phenotype.areParameterConfigured = true
      values.forEach((value, index) => {
        if (value.parameter !== null && value.parameter !== undefined && value.parameter.length) {
          this.phenotype.parameter[index].value = value.parameter
        } else {
          this.phenotype.parameter[index].value = undefined
          this.phenotype.areParameterConfigured = false
        }
      })
    }

    this.closeDialog.emit(this.phenotype)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }
}
