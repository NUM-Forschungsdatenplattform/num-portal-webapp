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

import { mockAql1, mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { AqlUiModel } from './aql-ui.model'
import { IAqlCohortApi } from './aql-cohort.interface'
import { ICohortGroupApi } from '../project/cohort-group-api.interface'
import { IDictionary } from '../dictionary.interface'
import { AqlParameterOperator } from './aql-parameter-operator.type'

describe('AqlUiModel', () => {
  const testCase1 = {
    aql: mockAql1,
    parameters: undefined,
    negated: undefined,
    expectNegated: false,
    expectParameterLength: 0,
    expectParameterConfigured: true,
  }
  const testCase2 = {
    aql: mockAql3,
    parameters: {
      $bodyHeight: 'testHeight',
    },
    negated: true,
    expectNegated: true,
    expectParameterLength: 2,
    expectParameterConfigured: false,
  }
  const testCase3 = {
    aql: mockAql3,
    parameters: {
      $bodyHeight: 'testHeight',
      $bodyWeight: 'testWeight',
    },
    negated: true,
    expectNegated: true,
    expectParameterLength: 2,
    expectParameterConfigured: true,
  }

  describe('When the model gets constructed', () => {
    test.each([testCase1, testCase2, testCase3])(
      'should set the correct properties',
      (testCase) => {
        const model = new AqlUiModel(testCase.aql, testCase.negated, testCase.parameters)

        expect(model.id).toEqual(testCase.aql.id)
        expect(model.name).toEqual(testCase.aql.name)
        expect(model.query).toEqual(testCase.aql.query)
        expect(model.isNegated).toEqual(testCase.expectNegated)
        expect(model.parameters.length).toEqual(testCase.expectParameterLength)
        expect(model.areParameterConfigured).toEqual(testCase.expectParameterConfigured)
        if (model.parameters.length) {
          expect(model.parameters[0].value).toEqual(testCase.parameters[model.parameters[0].name])
        }
      }
    )
  })

  describe('When the model is supposed to be converted to the Api Interface', () => {
    test.each([testCase1, testCase2])('should convert to the correct api interface', (testCase) => {
      const model = new AqlUiModel(testCase.aql, testCase.negated)
      const firstParameter = model.parameters[0]?.name
      const secondParameter = model.parameters[1]?.name
      const secondParameterValue = 'test'

      if (secondParameter) {
        model.parameters[1].value = secondParameterValue
      }

      const convertedModel = model.convertToApi()

      const parameters: IDictionary<string, string> = {}

      if (model.parameters.length) {
        parameters[firstParameter] = undefined
        parameters[secondParameter] = secondParameterValue
      }

      const expectedAql: IAqlCohortApi = {
        name: testCase.aql.name,
        id: testCase.aql.id,
        query: testCase.aql.query,
      }

      const expectedAqlQuery: ICohortGroupApi = {
        type: ConnectorNodeType.Aql,
        query: expectedAql,
        parameters,
      }

      if (testCase.expectNegated === false) {
        expect(convertedModel).toEqual(expectedAqlQuery)
      } else {
        const expectedResult: ICohortGroupApi = {
          type: ConnectorNodeType.Group,
          operator: LogicalOperator.Not,
          children: [expectedAqlQuery],
        }
        expect(convertedModel).toEqual(expectedResult)
      }
    })

    it('should replace the parameter operator in the query', () => {
      const model = new AqlUiModel(mockAql3)
      model.parameters.forEach((param) => {
        param.operator = AqlParameterOperator['!=']
      })

      const apiAql = model.convertToApi()
      const modelOfConversion = new AqlUiModel(apiAql.query)

      expect(apiAql.query.query).not.toContain('<')
      expect(apiAql.query.query).not.toContain('>')
      expect(modelOfConversion.parameters.length).toEqual(2)
    })
  })
})
