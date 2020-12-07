import { ConnectorNodeType } from './connector-node-type.enum'
import { LogicalOperator } from './logical-operator.enum'

export interface IConnectorGroupApi {
  operator?: LogicalOperator
  children?: any[]
  type: ConnectorNodeType
}
