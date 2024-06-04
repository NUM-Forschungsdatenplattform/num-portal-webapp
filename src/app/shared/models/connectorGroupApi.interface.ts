import { ConnectorNodeType } from './connector-node-type.enum'
import { LogicalOperator } from './logical-operator.enum'

export interface IConnectorGroupApi<T extends IConnectorGroupApi<T>> {
  operator?: LogicalOperator
  children?: T[]
  type: ConnectorNodeType
}
