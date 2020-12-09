import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeGroupUiModel } from './phenotype-group-ui.model'
import { IPhenotypeQueryApi } from './phenotype-query-api.interface'
import { PARAMETER_REGEX } from '../../../core/constants/constants'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorMainNodeUi } from '../connector-main-node-ui.interface'
import { ICohortGroupApi } from '../study/cohort-group-api.interface'

export class PhenotypeUiModel implements ConnectorMainNodeUi {
  id: number
  name: string
  description: string
  query: PhenotypeGroupUiModel
  indexInGroup: number | null
  type: ConnectorNodeType.Phenotype

  /** **used in the cohort definition** for flagging if this is negated */
  isNegated: boolean
  /** **used in the cohort definition** for flagging if all parameters are set */
  areParameterConfigured = true
  /** **used in the cohort definition** to set parameters */
  parameter: { name: string; value?: string }[] = []

  logicalOperator: LogicalOperator.And | LogicalOperator.Or

  constructor(phenotypeApi?: IPhenotypeApi, isNegated: boolean = false) {
    this.type = ConnectorNodeType.Phenotype
    this.id = phenotypeApi?.id || 0
    this.name = phenotypeApi?.name || undefined
    this.description = phenotypeApi?.description || undefined
    this.isNegated = isNegated
    this.query = new PhenotypeGroupUiModel()
    if (phenotypeApi) {
      this.convertQueryToUi(phenotypeApi.query)
      this.handleParameters(phenotypeApi.query)
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

  private collectParameters(query: IPhenotypeQueryApi, result: string[]): void {
    query.children.forEach((child) => {
      if (child.type === ConnectorNodeType.Aql) {
        const parametersInAql = child.aql.query.match(PARAMETER_REGEX)
        if (parametersInAql) {
          parametersInAql.forEach((param) => result.push(param))
        }
      } else {
        this.collectParameters(child, result)
      }
    })
  }

  private handleParameters(query: IPhenotypeQueryApi): void {
    const parameters: string[] = []
    this.collectParameters(query, parameters)
    this.parameter = [...new Set(parameters)].map((name) => {
      return { name, value: undefined }
    })

    if (this.parameter.length) {
      this.areParameterConfigured = false
    }
  }

  public convertToApiInterface(id?: number, name?: string, description?: string): IPhenotypeApi {
    const apiModel: IPhenotypeApi = {
      description: description || this.description,
      id: id || this.id,
      name: name || this.name,
      query: this.query.convertToApi(),
    }

    return apiModel
  }

  public convertToApi(): ICohortGroupApi {
    return this.isNegated ? this.convertToNegatedApiGroup() : this.getPhenotypeForStudyApi()
  }

  private getPhenotypeForStudyApi(): ICohortGroupApi {
    return {
      type: ConnectorNodeType.Phenotype,
      phenotypeId: this.id,
      parameters: this.parameter.reduce((hashMap, param) => {
        hashMap[param.name] = param.value
        return hashMap
      }, {}),
    }
  }

  private convertToNegatedApiGroup(): IPhenotypeQueryApi {
    return {
      type: ConnectorNodeType.Group,
      operator: LogicalOperator.Not,
      children: [this.getPhenotypeForStudyApi()],
    }
  }
}
