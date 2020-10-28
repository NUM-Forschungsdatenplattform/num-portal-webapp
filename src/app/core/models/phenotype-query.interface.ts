import { IAql } from './aql.interface'
import { LogicalOperator } from './logical-operator.enum'
import { PhenotypeQueryType } from './phenotype-query-type.enum'

export interface IPhenotypeQuery {
  type: PhenotypeQueryType
  operator?: LogicalOperator
  children?: IPhenotypeQuery[]
  aql?: IAql
}
