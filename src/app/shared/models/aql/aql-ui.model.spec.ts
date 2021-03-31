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
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { AqlUiModel } from './aql-ui.model'
import { IAqlPhenotypeApi } from './aql-phenotype.interface'

describe('AqlUiModel', () => {
  const testCase1 = {
    aql: mockAql1,
    negated: undefined,
    expectNegated: false,
    expectLength: 0,
    expectConfigured: true,
  }
  const testCase2 = {
    aql: mockAql3,
    negated: true,
    expectNegated: true,
    expectLength: 2,
    expectConfigured: false,
  }

  describe('When the model gets constructed', () => {
    test.each([testCase1, testCase2])('should set the correct properties', (testCase) => {
      const model = new AqlUiModel(testCase.aql, testCase.negated)

      expect(model.id).toEqual(testCase.aql.id)
      expect(model.name).toEqual(testCase.aql.name)
      expect(model.query).toEqual(testCase.aql.query)
      expect(model.isNegated).toEqual(testCase.expectNegated)
      expect(model.parameter.length).toEqual(testCase.expectLength)
      expect(model.areParameterConfigured).toEqual(testCase.expectConfigured)
    })
  })

  describe('When the model is supposed to be converted to the Api Interface', () => {
    test.each([testCase1, testCase2])('should convert to the correct api interface', (testCase) => {
      const model = new AqlUiModel(testCase.aql, testCase.negated)

      const convertedModel = model.convertToApi()

      const expectedAql: IAqlPhenotypeApi = {
        name: testCase.aql.name,
        id: testCase.aql.id,
        query: testCase.aql.query,
        purpose: testCase.aql.purpose,
        owner: testCase.aql.owner,
      }

      const expectedAqlQuery: IPhenotypeQueryApi = {
        type: ConnectorNodeType.Aql,
        aql: expectedAql,
      }

      if (testCase.expectNegated === false) {
        expect(convertedModel).toEqual(expectedAqlQuery)
      } else {
        const expectedResult: IPhenotypeQueryApi = {
          type: ConnectorNodeType.Group,
          operator: LogicalOperator.Not,
          children: [expectedAqlQuery],
        }
        expect(convertedModel).toEqual(expectedResult)
      }
    })

    it('should replace parameter variables with parameter values', () => {
      const model = new AqlUiModel(mockAql3)
      model.parameter.forEach((param, index) => {
        param.value = 'test' + index
      })

      const apiAql = model.convertToApi()
      const modelOfConversion = new AqlUiModel(apiAql.aql)

      expect(apiAql.aql.query).not.toContain('$')
      expect(modelOfConversion.parameter.length).toEqual(0)
    })
  })
})
