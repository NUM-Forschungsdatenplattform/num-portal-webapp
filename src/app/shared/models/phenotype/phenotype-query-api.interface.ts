import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IConnectorGroupApi } from '../connectorGroupApi.interface'
import { IAqlPhenotypeApi } from '../aql/aql-phenotype.interface'

export interface IPhenotypeQueryApi extends IConnectorGroupApi {
  type: ConnectorNodeType
  operator?: LogicalOperator
  children?: IPhenotypeQueryApi[]
  aql?: IAqlPhenotypeApi
}
