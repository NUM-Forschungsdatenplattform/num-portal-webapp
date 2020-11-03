import { IAql } from 'src/app/core/models/aql.interface'
import { LogicalOperator } from 'src/app/core/models/logical-operator.enum'
import { PhenotypeQueryType } from 'src/app/core/models/phenotype-query-type.enum'

export interface IPhenotypeQuery {
  type: PhenotypeQueryType
  operator?: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children?: IPhenotypeQuery[]
  indexInGroup?: number
  aql?: IAql
}
