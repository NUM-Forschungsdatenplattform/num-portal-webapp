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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { Subscription } from 'rxjs'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbWhereItemUiModel } from '../../models/aqb/aqb-where-item-ui.model'
import { AqbValueType } from '../../models/aqb/aqb-where-value-type.enum'

@Component({
  selector: 'num-aql-builder-where-item',
  templateUrl: './aql-builder-where-item.component.html',
  styleUrls: ['./aql-builder-where-item.component.scss'],
})
export class AqlBuilderWhereItemComponent implements OnInit, OnDestroy {
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  private subscriptions = new Subscription()
  AqbValueType = AqbValueType
  constructor() {}

  @Input()
  item: AqbWhereItemUiModel

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.AqlEditor

  @Output()
  deleteItem = new EventEmitter<string>()

  valueForm: FormGroup
  parameterForm: FormGroup

  ngOnInit(): void {
    this.valueForm = new FormGroup({
      value: new FormControl(this.item.value, [Validators.required]),
    })

    this.parameterForm = new FormGroup({
      value: new FormControl(this.item.parameterName, [Validators.required]),
    })

    this.subscriptions.add(
      this.valueForm.get('value').valueChanges.subscribe((value) => this.handleInputChange(value))
    )

    this.subscriptions.add(
      this.parameterForm
        .get('value')
        .valueChanges.subscribe((value) => this.handleParameterChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleInputChange(value): void {
    let newValue
    if (value === null || value === undefined || !value.length || value === '-') {
      newValue = value
    } else if (this.item.valueType === AqbValueType.Number) {
      newValue = (parseInt(value?.toString(), 10) || 0).toString()
    } else if (this.item.valueType === AqbValueType.Double) {
      const numberPattern = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
      const isValid = numberPattern.test(value.replace(',', '.'))
      newValue = isValid ? value : this.item.value
    } else {
      newValue = value
    }

    if (newValue !== value) {
      this.patchValue(newValue)
    } else {
      this.item.value = newValue
    }
  }

  handleParameterChange(value: string): void {
    const pattern = new RegExp('^[0-9a-zA-Z_]+$')
    let newValue = (value || '').replace(' ', '')
    const isValid = pattern.test(newValue) || !newValue.length
    newValue = isValid ? newValue : this.item.parameterName

    if (newValue !== value) {
      this.patchParameter(newValue)
    } else {
      this.item.parameterName = newValue
    }
  }

  patchValue(value): void {
    this.valueForm.patchValue({
      value,
    })
  }

  patchParameter(value): void {
    this.parameterForm.patchValue({
      value,
    })
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }

  datePickerChange($event: MatDatepickerInputEvent<Date, any>): void {
    const currentDate = this.item.value as Date
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    let newDate = $event.value
    if (newDate === null) {
      newDate = new Date()
    }
    newDate.setHours(hours, minutes, seconds, 0)
    this.item.value = newDate
  }
}
