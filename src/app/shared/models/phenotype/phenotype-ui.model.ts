import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeGroupUiModel } from './phenotype-group-ui.model'
import { IPhenotypeQueryApi } from './phenotype-query-api.interface'

export class PhenotypeUiModel {
  id: number
  name: string
  description: string
  query: PhenotypeGroupUiModel

  constructor(phenotypeApi?: IPhenotypeApi) {
    this.id = phenotypeApi?.id || 0
    this.name = phenotypeApi?.name || undefined
    this.description = phenotypeApi?.description || undefined
    this.query = new PhenotypeGroupUiModel()
    if (phenotypeApi) {
      this.convertQueryToUi(phenotypeApi.query)
    }
  }

  private convertQueryToUi(phenotypeQuery: IPhenotypeQueryApi): void {
    if (phenotypeQuery.operator === LogicalOperator.Not) {
      const isNegated = true
      const firstChild = phenotypeQuery.children[0]
      this.query.convertToUi(firstChild, isNegated)
    } else {
      this.query.convertToUi(phenotypeQuery, false)
    }
  }

  public convertToApiInterface(): IPhenotypeApi {
    const apiModel: IPhenotypeApi = {
      description: this.description,
      id: this.id,
      name: this.name,
      query: this.query.convertToApi(),
    }

    return apiModel
  }
}
