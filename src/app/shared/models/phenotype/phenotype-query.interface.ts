import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ConnectorNodeType } from '../connector-node-type.enum'

export interface IPhenotypeQuery {
  type: ConnectorNodeType
  operator?: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children?: IPhenotypeQuery[]
  indexInGroup?: number
  aql?: IAqlApi
}
