import { LogicalOperator } from '../logical-operator.enum'
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { PhenotypeQueryType } from '../phenotype/phenotype-query-type.enum'
import { IAql } from './aql.interface'
const PARAMETER_REGEX = /\$\w+/g
export class AqlUiModel {
  type = PhenotypeQueryType.Aql
  id: number
  name: string
  query: string
  isNegated: boolean
  parameter: string[]
  areParameterConfigured = true

  constructor(aql: IAql, isNegated: boolean = false) {
    this.id = aql.id
    this.name = aql.name
    this.query = aql.query
    this.isNegated = isNegated
    this.parameter = aql.query.match(PARAMETER_REGEX) || []

    if (this.parameter.length) {
      this.areParameterConfigured = false
    }
  }

  public convertToApi(): IPhenotypeQueryApi {
    return this.isNegated ? this.convertToNegatedApiGroup() : this.getAqlForApi()
  }

  private getAqlForApi(): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Aql,
      aql: {
        id: this.id,
        name: this.name,
        query: this.query,
      },
    }
  }

  private convertToNegatedApiGroup(): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.Not,
      children: [this.getAqlForApi()],
    }
  }
}
