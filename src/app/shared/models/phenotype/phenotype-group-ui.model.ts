import { AqlUiModel } from '../aql/aql-ui.model'
import { LogicalOperator } from '../logical-operator.enum'
import { IPhenotypeQueryApi } from './phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'

export class PhenotypeGroupUiModel extends ConnectorGroupUiModel {
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (PhenotypeGroupUiModel | AqlUiModel)[]
  indexInGroup: number | null = null

  constructor() {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  mapChildrenToUi = (child: IPhenotypeQueryApi): PhenotypeGroupUiModel | AqlUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Aql) {
        return new AqlUiModel(firstChild.aql, true)
      }
      const negatedGroup = new PhenotypeGroupUiModel()
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Aql) {
      return new AqlUiModel(child.aql, false)
    }
    const newGroup = new PhenotypeGroupUiModel()
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
