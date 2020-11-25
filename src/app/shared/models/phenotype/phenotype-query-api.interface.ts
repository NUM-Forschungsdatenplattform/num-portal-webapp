import { IAql } from '../aql/aql.interface'
import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'

export interface IPhenotypeQueryApi {
  type: ConnectorNodeType
  operator?: LogicalOperator
  children?: IPhenotypeQueryApi[]
  aql?: IAql
}
