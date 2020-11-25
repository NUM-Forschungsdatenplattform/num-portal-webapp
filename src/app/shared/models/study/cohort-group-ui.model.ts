import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeUiModel } from '../phenotype/phenotype-ui.model'
import { ConnectorNodeType } from '../connector-node-type.enum'

export class CohortGroupUiModel {
  type = ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | PhenotypeUiModel)[]
  indexInGroup: number | null = null
  constructor() {
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }
}
