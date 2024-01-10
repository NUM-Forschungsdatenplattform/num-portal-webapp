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

import { DatePipe } from '@angular/common'
import { LocalizedDatePipe } from './localized-date.pipe'

describe('LocalizedDatePipe', () => {
  let pipe: LocalizedDatePipe

  const translateService = {
    currentLang: 'de',
  } as TranslateService

  const datePipe = {
    transform: (_value: any, _format: any, _timezone: any, _locale: any) => '',
  } as DatePipe

  beforeEach(() => {
    pipe = new LocalizedDatePipe(translateService, datePipe)
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should set locale in datePipe', () => {
    const timestamp = '1607684353809'
    jest.spyOn(datePipe, 'transform')
    pipe.transform(timestamp)
    expect(datePipe.transform).toHaveBeenCalledWith(timestamp, 'mediumDate', undefined, 'de')
  })
})
