import { IAql } from '../aql/aql.interface'
import { LogicalOperator } from '../logical-operator.enum'
import { PhenotypeQueryType } from './phenotype-query-type.enum'

export interface IPhenotypeQueryApi {
  type: PhenotypeQueryType
  operator?: LogicalOperator
  children?: IPhenotypeQueryApi[]
  aql?: IAql
}
