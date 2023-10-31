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

import { Component, EventEmitter, Inject, InjectionToken, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ENVIROMENT_TOKEN } from '../../../config/app-config.service'

@Component({
  selector: 'num-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements OnInit, OnDestroy {
  
  constructor( @Inject(ENVIROMENT_TOKEN) readonly environmentToken: any) {}

  /* istanbul ignore next */
  private readonly debounceTime = this.environmentToken.name === 'test' ? 10 : 200
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

  form = new FormGroup({
    hours: new FormControl(0),
    minutes: new FormControl(0),
    seconds: new FormControl(0),
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
