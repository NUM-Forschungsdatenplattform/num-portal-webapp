import {
  mockPhenotype1,
  mockPhenotype2,
  mockPhenotype3,
} from 'src/mocks/data-mocks/phenotypes.mock'
import { PhenotypeUiModel } from './phenotype-ui.model'

describe('PhenotypeUiModel', () => {
  describe('When the model is supposed to convert to the ui model and back', () => {
    test.each([mockPhenotype1, mockPhenotype2, mockPhenotype3])(
      'should convert back to its origin',
      (phenotype) => {
        const model = new PhenotypeUiModel(phenotype)
        const apiModel = model.convertToApiInterface()
        expect(apiModel).toEqual(phenotype)
      }
    )
  })
})
