import { LogicalOperator } from '../logical-operator.enum'
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IAql } from './aql.interface'
import { PARAMETER_REGEX } from '../../../core/constants/constants'

export class AqlUiModel {
  type = ConnectorNodeType.Aql
  id: number
  name: string
  query: string
  isNegated: boolean
  parameter: { name: string; value?: string }[]
  areParameterConfigured = true

  constructor(aql: IAql, isNegated: boolean = false) {
    this.id = aql.id
    this.name = aql.name
    this.query = aql.query
    this.isNegated = isNegated
    this.parameter = (aql.query.match(PARAMETER_REGEX) || []).map((name) => {
      return { name, value: undefined }
    })

    if (this.parameter.length) {
      this.areParameterConfigured = false
    }
  }

  public convertToApi(): IPhenotypeQueryApi {
    return this.isNegated ? this.convertToNegatedApiGroup() : this.getAqlForApi()
  }

  private getAqlForApi(): IPhenotypeQueryApi {
    return {
      type: ConnectorNodeType.Aql,
      aql: {
        id: this.id,
        name: this.name,
        query: this.insertParamsForApi(this.query),
      },
    }
  }

  private convertToNegatedApiGroup(): IPhenotypeQueryApi {
    return {
      type: ConnectorNodeType.Group,
      operator: LogicalOperator.Not,
      children: [this.getAqlForApi()],
    }
  }

  private insertParamsForApi(queryString: string): string {
    let resultString = queryString
    this.parameter.forEach((param) => {
      resultString = resultString.replace(param.name, param.value ? param.value : param.name)
    })
    return resultString
  }
}
