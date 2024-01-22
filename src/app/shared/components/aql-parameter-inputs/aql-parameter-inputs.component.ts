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
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { DateAdapter } from '@angular/material/core'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { AqlParameterValueType } from '../../models/aql/aql-parameter-value-type.enum'
import { IItem } from '../../models/item.interface'
import moment from 'moment'

@Component({
  selector: 'num-aql-parameter-inputs',
  templateUrl: './aql-parameter-inputs.component.html',
  styleUrls: ['./aql-parameter-inputs.component.scss'],
})
export class AqlParameterInputsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  AqlParameterValueType = AqlParameterValueType

  private localItem: IItem = null
  @Input()
  get item(): IItem {
    return this.localItem
  }
  set item(newValue: IItem) {
    const isInitial = this.localItem === null
    if (isInitial || this.localItem.value !== newValue.value) {
      this.localItem = newValue
      if (!isInitial) {
        this.valueChange.emit()
      }
    }
  }
  private localDisabled: boolean
  @Input()
  get disabled(): boolean {
    return this.localDisabled
  }
  set disabled(state: boolean) {
    this.localDisabled = state
    if (state === true) {
      this.valueForm?.get('value').disable()
    } else {
      this.valueForm?.get('value').enable()
      this.valueForm?.get('value').markAllAsTouched()
    }
  }
  @Input() mode: 'aqb' | 'cohortBuilder'
  @Output() valueChange = new EventEmitter()

  constructor(
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService
  ) {}

  valueForm: UntypedFormGroup

  ngOnInit(): void {
    if (
      this.item.valueType === AqlParameterValueType.Date ||
      this.item.valueType === AqlParameterValueType.DateTime
    ) {
      this.dateAdapter.setLocale(this.translate.currentLang ? this.translate.currentLang : 'de-DE')

      this.subscriptions.add(
        this.translate.onLangChange.subscribe((lang) => {
          this.dateAdapter.setLocale(lang.lang ? lang.lang : 'de-DE')
        })
      )
    }
    this.valueForm = new UntypedFormGroup({
      value: new UntypedFormControl({ value: this.item?.value, disabled: this.disabled }, [
        Validators.required,
      ]),
    })

    this.subscriptions.add(
      this.valueForm.get('value').valueChanges.subscribe((value) => this.handleInputChange(value))
    )

    this.valueForm?.get('value').markAllAsTouched()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleInputChange(value): void {
    let newValue
    if (value === null || value === undefined || !value.length || value === '-') {
      newValue = value
    } else if (this.item?.valueType === AqlParameterValueType.Number) {
      newValue = (parseInt(value?.toString(), 10) || 0).toString()
    } else if (this.item?.valueType === AqlParameterValueType.Double) {
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
      this.valueChange.emit()
    }
  }

  patchValue(value): void {
    this.valueForm.patchValue({
      value,
    })
  }

  datePickerChange($event: MatDatepickerInputEvent<moment.Moment, any>): void {
    const currentDate = moment(this.item.value)
    const hour = currentDate.hours()
    const minute = currentDate.minutes()
    const second = currentDate.seconds()
    let newDate = $event.value
    if (newDate === null) {
      newDate = moment()
    }
    newDate.set('hour', hour)
    newDate.set('minute', minute)
    newDate.set('second', second)
    this.item.value = newDate
  }
}
