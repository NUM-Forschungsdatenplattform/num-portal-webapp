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
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { cloneDeep } from 'lodash-es'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-edit-aql',
  templateUrl: './dialog-edit-aql.component.html',
  styleUrls: ['./dialog-edit-aql.component.scss'],
})
export class DialogEditAqlComponent implements OnInit, IGenericDialog<AqlUiModel> {
  constructor(private formBuilder: FormBuilder) {}

  @Output() closeDialog = new EventEmitter()
  dialogInput: AqlUiModel
  aql: AqlUiModel
  queryHighlighted: string
  parameterForm: FormGroup
  get formParameters(): FormArray {
    return this.parameterForm.get('parameters') as FormArray
  }

  ngOnInit(): void {
    this.aql = cloneDeep(this.dialogInput)
    this.queryHighlighted = this.highlightQueryString(this.aql.query)

    if (this.aql?.parameter?.length) {
      this.generateParameterForm()
    }
  }

  highlightQueryString(aqlQuery: string): string {
    let resultString = aqlQuery
    this.aql.parameter.forEach((param, index) => {
      resultString = resultString.replace(param.name, `<span class="mark">${param.name}</span>`)
    })
    return resultString
  }

  generateParameterForm(): void {
    this.parameterForm = this.formBuilder.group({
      parameters: this.formBuilder.array([]),
    })

    this.aql.parameter.forEach((parameter) => {
      this.formParameters.push(this.buildFormInput(parameter))
    })
  }

  buildFormInput(parameter: { name: string; value?: string }): FormGroup {
    return this.formBuilder.group({
      parameter: parameter.value,
    })
  }

  handleDialogConfirm(): void {
    if (this.aql?.parameter?.length) {
      const values = this.formParameters.value as { parameter: any }[]
      this.aql.areParameterConfigured = true
      values.forEach((value, index) => {
        if (
          value &&
          value.parameter !== null &&
          value.parameter !== undefined &&
          value.parameter.length
        ) {
          this.aql.parameter[index].value = value.parameter
        } else {
          this.aql.parameter[index].value = undefined
          this.aql.areParameterConfigured = false
        }
      })
    }

    this.closeDialog.emit(this.aql)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit(false)
  }
}
