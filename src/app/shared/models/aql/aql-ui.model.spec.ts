import { mockAql1, mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { LogicalOperator } from '../logical-operator.enum'
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { AqlUiModel } from './aql-ui.model'

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

      const expectedAqlQuery = {
        type: ConnectorNodeType.Aql,
        aql: testCase.aql,
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
