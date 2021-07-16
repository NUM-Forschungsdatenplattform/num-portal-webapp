import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import { Subscription } from 'rxjs'
import { AqlParameterValueType } from '../../models/aql/aql-parameter-value-type.enum'
import { IDictionary } from '../../models/dictionary.interface'

interface IItem {
  value: any
  valueType: AqlParameterValueType
  name: string
  options?: IDictionary<any, any>
}
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
    }
  }
  @Input() mode: 'aqb' | 'cohortBuilder'
  @Output() valueChange = new EventEmitter()

  constructor() {}

  valueForm: FormGroup

  ngOnInit(): void {
    this.valueForm = new FormGroup({
      value: new FormControl({ value: this.item?.value, disabled: this.disabled }, [
        Validators.required,
      ]),
    })

    this.subscriptions.add(
      this.valueForm.get('value').valueChanges.subscribe((value) => this.handleInputChange(value))
    )
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
