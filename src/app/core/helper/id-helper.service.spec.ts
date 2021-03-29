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

import { IdHelperService } from './id-helper.service'

describe('IdHelperService', () => {
  let service: IdHelperService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(IdHelperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should generate a simple id on getSimpleId method', () => {
    const id = IdHelperService.getSimpleId()
    expect(id.length).toEqual(5)
    expect(id.split('x').length).toEqual(2)
  })
})
