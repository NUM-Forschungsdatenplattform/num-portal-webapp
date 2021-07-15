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

import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { CanDeactivateSearchGuard } from './can-deactivate-search.guard'

describe('CanDeactivateSearchGuard', () => {
  let guard: CanDeactivateSearchGuard

  const mockPatientFilterService = ({
    resetCurrentProject: jest.fn(),
  } as unknown) as PatientFilterService

  beforeEach(() => {
    jest.spyOn(mockPatientFilterService, 'resetCurrentProject')
    guard = new CanDeactivateSearchGuard(mockPatientFilterService)
  })

  it('should reset the current project on path leave', () => {
    guard.canDeactivate('')
    expect(mockPatientFilterService.resetCurrentProject).toHaveBeenCalledTimes(1)
  })
})
