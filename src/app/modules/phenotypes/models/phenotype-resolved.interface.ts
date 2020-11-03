import { IPhenotypeApi } from 'src/app/core/models/phenotype-api.interface'
import { PhenotypeUiModel } from './phenotype-ui.model'

export interface IPhenotypeResolved {
  error: string
  phenotype: PhenotypeUiModel
}
