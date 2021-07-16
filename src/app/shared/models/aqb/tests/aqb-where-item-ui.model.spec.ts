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

import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IContainmentTreeNode } from '../../../../modules/aqls/models/containment-tree-node.interface'
import {
  COMPARISON_OPERATOR_OPTIONS_EQUALS,
  COMPARISON_OPERATOR_OPTIONS_INEQUALS,
} from '../aqb-comparison-operator-options'
import { AqbWhereItemUiModel } from '../aqb-where-item-ui.model'
import { AqlParameterValueType } from '../../aql/aql-parameter-value-type.enum'

describe('AqbWhereItemUiModel', () => {
  describe('on init it should configure the correct input and options', () => {
    const compositionId = 'openEHR-EHR-COMPOSITION.report.v1'
    const compositionReferenceId = 1
    const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'
    const archetypeReferenceId = 2

    const item: IContainmentTreeNode = {
      archetypeId,
      parentArchetypeId: compositionId,
      displayName: 'Test',
    }

    it('should do so for type double', () => {
      item.rmType = ReferenceModelType.Double
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = [
        ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
        ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
      ]
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.Double)
      expect(model.value).toEqual(1.1)
    })

    it('should do so for type date', () => {
      item.rmType = ReferenceModelType.Dv_date
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = [
        ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
        ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
      ]
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.Date)
      expect(model.value).toBeInstanceOf(Date)
    })

    it('should do so for type date time', () => {
      item.rmType = ReferenceModelType.Dv_date_time
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = [
        ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
        ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
      ]
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.DateTime)
      expect(model.value).toBeInstanceOf(Date)
    })

    it('should do so for type time', () => {
      item.rmType = ReferenceModelType.Dv_time
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = [
        ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
        ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
      ]
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.Time)
      expect(model.value).toBeInstanceOf(Date)
    })

    it('should do so for type string', () => {
      item.rmType = ReferenceModelType.Dv_text
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = COMPARISON_OPERATOR_OPTIONS_EQUALS
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.String)
      expect(model.value).toEqual('')
    })

    test.each([ReferenceModelType.Long, ReferenceModelType.Integer, ReferenceModelType.Integer64])(
      'should do so for type long',
      (type) => {
        item.rmType = type
        const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
        const options = [
          ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
          ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
        ]
        jest.setTimeout(2)
        expect(model.comparisonOperatorOptions).toEqual(options)
        expect(model.valueType).toEqual(AqlParameterValueType.Number)
        expect(model.value).toEqual(0)
      }
    )

    it('should do so for type boolean', () => {
      item.rmType = ReferenceModelType.Boolean
      const model = new AqbWhereItemUiModel(item, compositionReferenceId, archetypeReferenceId)
      const options = COMPARISON_OPERATOR_OPTIONS_EQUALS
      jest.setTimeout(2)
      expect(model.comparisonOperatorOptions).toEqual(options)
      expect(model.valueType).toEqual(AqlParameterValueType.Boolean)
      expect(model.value).toEqual(true)
    })
  })
})
