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

import { mockAql1 } from 'src/mocks/data-mocks/aqls.mock'
import { AqlUiModel } from '../aql/aql-ui.model'
import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeGroupUiModel } from './phenotype-group-ui.model'
import { IPhenotypeQueryApi } from './phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
describe('PhenotypeGroupUiModel', () => {
  const testPhenotype: IPhenotypeQueryApi = {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.Or,
    children: [
      {
        type: ConnectorNodeType.Aql,
        aql: mockAql1,
      },
    ],
  }

  const testPhenotype2: IPhenotypeQueryApi = {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.Or,
    children: [],
  }
  describe('When the model gets constructed', () => {
    it('should create an empty group with and operator without negation', () => {
      const model = new PhenotypeGroupUiModel()
      expect(model.children.length).toEqual(0)
      expect(model.logicalOperator).toEqual(LogicalOperator.And)
      expect(model.isNegated).toEqual(false)
    })
  })

  describe('When the model is supposed to convert a query to the UI model', () => {
    let model: PhenotypeGroupUiModel
    beforeEach(() => {
      model = new PhenotypeGroupUiModel()
      model.convertToUi(testPhenotype)
    })

    it('should convert correct', () => {
      const expectedResult = {
        indexInGroup: null,
        isNegated: false,
        type: ConnectorNodeType.Group,
        logicalOperator: LogicalOperator.Or,
        children: [new AqlUiModel(mockAql1)],
      }

      expect(model.indexInGroup).toEqual(expectedResult.indexInGroup)
      expect(model.isNegated).toEqual(expectedResult.isNegated)
      expect(model.type).toEqual(expectedResult.type)
      expect(model.logicalOperator).toEqual(expectedResult.logicalOperator)
      expect(model.children).toEqual(expectedResult.children)
    })
  })

  describe('When the model is supposed to convert a query to the UI model', () => {
    let model: PhenotypeGroupUiModel
    beforeEach(() => {
      model = new PhenotypeGroupUiModel()
      model.convertToUi(testPhenotype2)
    })

    it('should convert correct', () => {
      const expectedResult = {
        indexInGroup: null,
        isNegated: false,
        type: ConnectorNodeType.Group,
        logicalOperator: LogicalOperator.Or,
        children: [],
      }

      expect(model.indexInGroup).toEqual(expectedResult.indexInGroup)
      expect(model.isNegated).toEqual(expectedResult.isNegated)
      expect(model.type).toEqual(expectedResult.type)
      expect(model.logicalOperator).toEqual(expectedResult.logicalOperator)
      expect(model.children).toEqual(expectedResult.children)
    })
  })
})
