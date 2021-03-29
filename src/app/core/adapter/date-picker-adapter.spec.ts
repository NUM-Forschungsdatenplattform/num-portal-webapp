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

import { Platform } from '@angular/cdk/platform'
import { CustomDatePickerAdapter } from './date-picker-adapter'

describe('DateHelperService', () => {
  let adapter: CustomDatePickerAdapter
  const platform = new Platform({})
  platform.isBrowser = true
  platform.WEBKIT = true
  platform.ANDROID = false
  platform.BLINK = false
  platform.EDGE = false
  platform.FIREFOX = false
  platform.IOS = false
  platform.SAFARI = false
  platform.TRIDENT = false

  const date = new Date(2021, 1, 12)

  beforeEach(() => {
    adapter = new CustomDatePickerAdapter('de', platform)
  })

  it('should be created', () => {
    expect(adapter).toBeTruthy()
  })

  it('should parse german format', () => {
    const result = adapter.parse('12.2.2021')
    expect(result).toEqual(date)
  })

  it('should parse english format', () => {
    const result = adapter.parse('2021/2/12')
    expect(result).toEqual(date)
  })

  it('should parse timestamps', () => {
    const timestamp = date.getTime()
    const result = adapter.parse(timestamp)
    expect(result).toEqual(date)
  })

  test.each(['abc', 'ab.c', 'abcd/ef', '12.bc.2020'])('should return null on invalid', (input) => {
    const result = adapter.parse(input)
    expect(result).toEqual(null)
  })
})
