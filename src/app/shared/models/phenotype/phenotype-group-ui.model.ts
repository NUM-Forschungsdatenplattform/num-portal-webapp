import { AqlUiModel } from '../aql/aql-ui.model'
import { LogicalOperator } from '../logical-operator.enum'
import { IPhenotypeQueryApi } from './phenotype-query-api.interface'
import { PhenotypeQueryType } from './phenotype-query-type.enum'

export class PhenotypeGroupUiModel {
  type = PhenotypeQueryType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (PhenotypeGroupUiModel | AqlUiModel)[]
  indexInGroup: number | null = null

  constructor() {
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  public convertToUi(apiGroup: IPhenotypeQueryApi, isNegated: boolean = false): void {
    this.isNegated = isNegated
    // if (apiGroup.operator === LogicalOperator.Not) {
    //   const
    // }
    debugger
    this.logicalOperator =
      apiGroup.operator === LogicalOperator.And ? LogicalOperator.And : LogicalOperator.Or

    if (apiGroup.children) {
      this.children = apiGroup.children.map(this.mapChildrenToUi)
    }
  }

  private mapChildrenToUi = (child: IPhenotypeQueryApi): PhenotypeGroupUiModel | AqlUiModel => {
    if (child.type === PhenotypeQueryType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === PhenotypeQueryType.Aql) {
        return new AqlUiModel(firstChild.aql, true)
      }
      const negatedGroup = new PhenotypeGroupUiModel()
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === PhenotypeQueryType.Aql) {
      return new AqlUiModel(child.aql, false)
    }
    const newGroup = new PhenotypeGroupUiModel()
    newGroup.convertToUi(child, false)
    return newGroup
  }

  public convertToApi(): IPhenotypeQueryApi {
    return this.isNegated ? this.convertGroupToNegatedApiGroup() : this.convertGroupToApiGroup()
  }

  private convertGroupToApiGroup(): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Group,
      operator: this.logicalOperator,
      children: this.children.map(this.mapChildrentoApi),
    }
  }

  private convertGroupToNegatedApiGroup(): IPhenotypeQueryApi {
    return {
      type: PhenotypeQueryType.Group,
      operator: LogicalOperator.Not,
      children: [
        {
          type: PhenotypeQueryType.Group,
          operator: this.logicalOperator,
          children: this.children.map(this.mapChildrentoApi),
        },
      ],
    }
  }

  private mapChildrentoApi = (child: PhenotypeGroupUiModel | AqlUiModel): IPhenotypeQueryApi => {
    return child.convertToApi()
  }
}
