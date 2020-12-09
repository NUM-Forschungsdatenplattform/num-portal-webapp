import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeUiModel } from '../phenotype/phenotype-ui.model'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'
import { ICohortGroupApi } from './cohort-group-api.interface'

export class CohortGroupUiModel extends ConnectorGroupUiModel {
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | PhenotypeUiModel)[]
  indexInGroup: number | null = null
  constructor() {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  /**
   * Checks if parameters of children are configured. **Use with caution / propper changedetection!**
   */
  get areParameterConfigured(): boolean {
    return !this.children.some((child) => {
      return child.areParameterConfigured === false
    })
  }

  mapChildrenToUi = (child: ICohortGroupApi): CohortGroupUiModel | PhenotypeUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Phenotype) {
        // TODO: Get from Service, negate
        return new PhenotypeUiModel()
      }
      const negatedGroup = new CohortGroupUiModel()
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Phenotype) {
      // TODO: Get from Service, do not negate
      return new PhenotypeUiModel()
    }
    const newGroup = new CohortGroupUiModel()
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
