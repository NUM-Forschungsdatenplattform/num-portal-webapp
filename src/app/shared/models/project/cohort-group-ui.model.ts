import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'
import { AqlUiModel } from '../aql/aql-ui.model'
import { ICohortGroupApi } from './cohort-group-api.interface'

export class CohortGroupUiModel extends ConnectorGroupUiModel<ICohortGroupApi> {
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | AqlUiModel)[]
  indexInGroup: number | null = null
  addedByClick: boolean

  constructor(addedByClick = false) {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
    this.addedByClick = addedByClick
  }

  /**
   * Checks if parameters of children are configured. **Use with caution / propper changedetection!**
   */
  get areParameterConfigured(): boolean {
    return !this.children.some((child) => {
      return child.areParameterConfigured === false
    })
  }

  mapChildrenToUi = (child: ICohortGroupApi): CohortGroupUiModel | AqlUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Aql) {
        return new AqlUiModel(firstChild.query, true, firstChild.parameters)
      }

      const negatedGroup = new CohortGroupUiModel()
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Aql) {
      return new AqlUiModel(child.query, false, child.parameters)
    }

    const newGroup = new CohortGroupUiModel()
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
