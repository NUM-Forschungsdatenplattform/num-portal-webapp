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

import { AvailableRoles } from '../models/available-roles.enum'
import { AvailableRolesPipe } from './available-roles.pipe'

describe('AvailableRolesPipe', () => {
  let pipe: AvailableRolesPipe

  beforeEach(() => {
    pipe = new AvailableRolesPipe()
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should filter roles not included in AvailableRoles', () => {
    const input = [AvailableRoles.SuperAdmin, 'some-not-included-role']
    const result = pipe.transform(input)
    expect(result).toEqual([AvailableRoles.SuperAdmin])
  })
})
