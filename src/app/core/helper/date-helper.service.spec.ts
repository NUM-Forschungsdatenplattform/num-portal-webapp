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

import { TestBed } from '@angular/core/testing'

import { DateHelperService } from './date-helper.service'
import moment from 'moment'

describe('DateHelperService', () => {
  let service: DateHelperService
  const dateString = '2021-01-02T11:12:13+0100'
  const date = new Date(2021, 0, 2, 11, 12, 13)
  const momentDate = moment(date)

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DateHelperService)
    date.getTimezoneOffset = jest.fn().mockImplementation(() => 0)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('Should convert date times as expected', () => {
    const result = DateHelperService.getIsoString(momentDate)
    expect(result).toEqual(dateString)
  })

  it('Should convert dates as expected', () => {
    const result = DateHelperService.getDateString(moment(dateString))
    expect(result).toEqual('2021-01-02')
  })

  it('Should convert times as expected', () => {
    const result = DateHelperService.getTimeString(momentDate)
    expect(result).toEqual('11:12:13')
  })
})
