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

import { mockAqlCohort } from 'src/mocks/data-mocks/aqls.mock'
import { AqlUiModel } from '../aql/aql-ui.model'
import { CohortGroupUiModel } from './cohort-group-ui.model'

describe('CohortGroupUiModel', () => {
  let cohort: CohortGroupUiModel
  let firstGroup: CohortGroupUiModel
  let secondGroup: CohortGroupUiModel
  beforeEach(() => {
    cohort = new CohortGroupUiModel()
    firstGroup = new CohortGroupUiModel()
    secondGroup = new CohortGroupUiModel()

    firstGroup.isNegated = true
    firstGroup.children.push(
      new AqlUiModel(mockAqlCohort, false, {
        bodyHeight: 'testHeight',
        bodyWeight: 'testWeight',
      })
    )

    secondGroup.children.push(
      new AqlUiModel(mockAqlCohort, false, {
        bodyHeight: 'testHeight',
        bodyWeight: 'testWeight',
      })
    )
    secondGroup.children.push(
      new AqlUiModel(mockAqlCohort, false, {
        bodyHeight: 'testHeight',
      })
    )

    cohort.children.push(new AqlUiModel(mockAqlCohort, true))
    cohort.children.push(firstGroup)
    cohort.children.push(secondGroup)
  })

  it('should handle parameters as expected', () => {
    expect(cohort.areParameterConfigured).toBeFalsy()
    expect(firstGroup.areParameterConfigured).toBeTruthy()
    expect(secondGroup.areParameterConfigured).toBeFalsy()
  })

  it('should convert in both directions', () => {
    const apiGroup = cohort.convertToApi()
    const convertedCohort = new CohortGroupUiModel()
    convertedCohort.convertToUi(apiGroup)
    expect(JSON.stringify(convertedCohort)).toEqual(JSON.stringify(cohort))
  })
})
