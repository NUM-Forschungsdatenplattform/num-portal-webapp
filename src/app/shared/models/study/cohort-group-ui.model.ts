import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeUiModel } from '../phenotype/phenotype-ui.model'
import { CohortGroupType } from './cohort-group-type.enum'

export class CohortGroupUiModel {
  type: CohortGroupType
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
