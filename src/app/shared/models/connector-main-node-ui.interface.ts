import { ConnectorNodeType } from './connector-node-type.enum'
import { IConnectorGroupApi } from './connectorGroupApi.interface'
import { LogicalOperator } from './logical-operator.enum'

export interface ConnectorMainNodeUi {
  type: ConnectorNodeType.Aql | ConnectorNodeType.Phenotype
  isNegated: boolean
  indexInGroup: number | null

  convertToApi(): IConnectorGroupApi
}
