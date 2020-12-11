import { IAqlApi } from '../aql/aql.interface'
import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IConnectorGroupApi } from '../connectorGroupApi.interface'

export interface IPhenotypeQueryApi extends IConnectorGroupApi {
  type: ConnectorNodeType
  operator?: LogicalOperator
  children?: IPhenotypeQueryApi[]
  aql?: IAqlApi
}
