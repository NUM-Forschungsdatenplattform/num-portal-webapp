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
