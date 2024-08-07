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
    if (this.item.valueType === AqlParameterValueType.Duration) {
      let value: string = '',
        unit: string = 'y'
      if (this.item?.value) {
        if (this.item.value.seconds() != 0) {
          value = this.item.value.asSeconds().toString()
          unit = 's'
        } else if (this.item.value.minutes() != 0) {
          value = this.item.value.asMinutes().toString()
          unit = 'm'
        } else if (this.item.value.hours() != 0) {
          value = this.item.value.asHours().toString()
          unit = 'h'
        } else if (this.item.value.days() != 0) {
          value = this.item.value.asDays().toString()
          unit = 'd'
        } else if (this.item.value.months() != 0) {
          value = this.item.value.asMonths().toString()
          unit = 'M'
        } else if (this.item.value.years() != 0) {
          value = this.item.value.asYears().toString()
          unit = 'y'
        }
      }

      this.valueForm = new UntypedFormGroup({
        value: new UntypedFormControl({ value: value, disabled: this.disabled }, [
          Validators.required,
        ]),
        unit: new UntypedFormControl({ value: unit, disabled: this.disabled }, [
          Validators.required,
        ]),
      })
    } else {
      this.valueForm = new UntypedFormGroup({
        value: new UntypedFormControl({ value: this.item?.value, disabled: this.disabled }, [
          Validators.required,
        ]),
      })
    }

    this.subscriptions.add(
      this.valueForm.valueChanges.subscribe((value) => this.handleInputChange(value))
    )

    this.valueForm?.get('value').markAllAsTouched()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleInputChange(input: { value: string; unit: 'y' | 'M' | 'd' | 'h' | 'm' | 's' }): void {
    let newValue
    if (
      input.value === null ||
      input.value === undefined ||
      !input.value.length ||
      input.value === '-'
    ) {
      newValue = input.value
    } else if (this.item?.valueType === AqlParameterValueType.Number) {
      newValue = (parseInt(input.value?.toString(), 10) || 0).toString()
    } else if (this.item?.valueType === AqlParameterValueType.Double) {
      const numberPattern = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
      const isValid = numberPattern.test(input.value.replace(',', '.'))
      newValue = isValid ? input.value : this.item.value
    } else if (this.item?.valueType === AqlParameterValueType.Duration) {
      newValue = moment.duration(input.value, input.unit)
    } else {
      newValue = input.value
    }

    if (newValue !== input.value && this.item?.valueType !== AqlParameterValueType.Duration) {
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

  numericValuesOnly(event: InputEvent): boolean {
    console.log(event.data)
    const pattern = /^\d*$/
    return event.data === null || pattern.test(event.data)
  }
}
