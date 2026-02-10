import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { DateAdapter } from '@angular/material/core'
import {
  MatDatepickerInputEvent,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { Subject, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { AqlParameterValueType } from '../../models/aql/aql-parameter-value-type.enum'
import { IItem } from '../../models/item.interface'
import moment from 'moment'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatSelect, MatOption } from '@angular/material/select'
import { TimeInputComponent } from '../time-input/time-input.component'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'num-aql-parameter-inputs',
  templateUrl: './aql-parameter-inputs.component.html',
  styleUrls: ['./aql-parameter-inputs.component.scss'],
  imports: [
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    FontAwesomeModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    TimeInputComponent,
    TranslatePipe,
  ],
})
export class AqlParameterInputsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  private _onDestroy = new Subject<void>()
  AqlParameterValueType = AqlParameterValueType
  faXmark = faXmark

  // FormControl für die Options-Suche
  public optionsFilterCtrl: UntypedFormControl = new UntypedFormControl()
  
  // Gefilterte Options Array
  public filteredOptions: Array<{ key: string; value: string }> = []

  private localItem: IItem = null
  @Input()
  get item(): IItem {
    return this.localItem
  }
  set item(newValue: IItem) {
    const isInitial = this.localItem === null
    if (isInitial || this.localItem.value !== newValue.value) {
      this.localItem = newValue
      
      // Initialisiere gefilterte Optionen wenn valueType Options ist
      if (newValue?.valueType === AqlParameterValueType.Options && newValue.options) {
        this.initializeOptionsFilter()
      }
      
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
  private initializeOptionsFilter(): void {
    const optionsArray = Object.entries(this.item.options).map(([key, value]) => ({
      key,
      value: value as string
    }))
    
    this.filteredOptions = optionsArray
    
    this.subscriptions.add(
      this.optionsFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterOptions(optionsArray)
        })
    )
  }

  private filterOptions(optionsArray: Array<{ key: string; value: string }>): void {
    const search = this.optionsFilterCtrl.value
    
    if (!search) {
      this.filteredOptions = optionsArray
      return
    }
    
    const searchLower = search.toLowerCase()
    this.filteredOptions = optionsArray.filter(option => 
      option.value.toLowerCase().includes(searchLower) || 
      option.key.toLowerCase().includes(searchLower)
    )
  }

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
    if (this.item?.valueType === AqlParameterValueType.Options && this.item.options) {
      this.initializeOptionsFilter()
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
    this._onDestroy.next()
    this._onDestroy.complete()
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
