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
        expect(apiModel.id).toEqual(phenotype.id)
        expect(apiModel.name).toEqual(phenotype.name)
        expect(apiModel.description).toEqual(phenotype.description)
        expect(apiModel.query).toEqual(phenotype.query)
      }
    )
  })
})
