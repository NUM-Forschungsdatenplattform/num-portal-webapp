import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'num-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements OnInit, OnDestroy {
  /* istanbul ignore next */
  private readonly debounceTime = environment.name === 'test' ? 10 : 200
  private subscriptions = new Subscription()

  inputFields = [
    {
      name: 'DATE_TIME.HOUR_SHORT',
      formControl: 'hours',
      lowerBound: 0,
      upperBound: 23,
    },
    {
      name: 'DATE_TIME.MINUTE_SHORT',
      formControl: 'minutes',
      lowerBound: 0,
      upperBound: 59,
    },
    {
      name: 'DATE_TIME.SECOND_SHORT',
      formControl: 'seconds',
      lowerBound: 0,
      upperBound: 59,
    },
  ]

  @Input() appearance = 'outline'
  @Input() disabled: boolean

  currentDate: Date
  @Output() dateChange = new EventEmitter()
  @Input()
  get date(): Date {
    return this.currentDate || new Date()
  }

  set date(newDate: Date) {
    if (this.currentDate === newDate) {
      return
    }
    const inputValues = this.getValuesFromInput()
    const dateValues = this.getValuesFromDate(newDate)
    if (
      inputValues.hours !== dateValues.hours ||
      inputValues.minutes !== dateValues.minutes ||
      inputValues.seconds !== dateValues.seconds
    ) {
      this.patchValues(dateValues.hours, dateValues.minutes, dateValues.seconds)
    }
    this.currentDate = newDate
    this.dateChange.emit(newDate)
  }

  constructor() {}

  form = new UntypedFormGroup({
    hours: new UntypedFormControl(0),
    minutes: new UntypedFormControl(0),
    seconds: new UntypedFormControl(0),
  })

  ngOnInit(): void {
    if (this.disabled) {
      this.form.disable()
    }

    this.subscriptions.add(
      this.form.valueChanges
        .pipe(debounceTime(this.debounceTime))
        .subscribe(() => this.handleInputChange())
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getValuesFromInput(): { hours; minutes; seconds } {
    const hours = this.form.get('hours').value
    const minutes = this.form.get('minutes').value
    const seconds = this.form.get('seconds').value

    return { hours, minutes, seconds }
  }

  getValuesFromDate(value: Date): { hours; minutes; seconds } {
    if (value.getHours) {
      const hours = value.getHours()
      const minutes = value.getMinutes()
      const seconds = value.getSeconds()

      return { hours, minutes, seconds }
    }
    return { hours: 0, minutes: 0, seconds: 0 }
  }

  restrictToBoundaries(value: number, lower: number, upper: number): number {
    return Math.max(Math.min(value, upper), lower)
  }

  handleInputChange(): void {
    const { hours, minutes, seconds } = this.getValuesFromInput()
    const checkedHours = this.restrictToBoundaries(hours, 0, 23)
    const checkedMinutes = this.restrictToBoundaries(minutes, 0, 59)
    const checkedSeconds = this.restrictToBoundaries(seconds, 0, 59)

    if (hours !== checkedHours || minutes !== checkedMinutes || seconds !== checkedSeconds) {
      this.patchValues(checkedHours, checkedMinutes, checkedSeconds)
    } else {
      const newDate = new Date(this.date.toISOString())
      newDate.setHours(checkedHours, checkedMinutes, checkedSeconds, 0)
      this.date = newDate
    }
  }

  patchValues(hours: number, minutes: number, seconds: number): void {
    this.form.patchValue({
      hours,
      minutes,
      seconds,
    })
  }
}
