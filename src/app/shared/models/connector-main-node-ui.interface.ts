import { ConnectorNodeType } from './connector-node-type.enum'
import { IConnectorGroupApi } from './connectorGroupApi.interface'

export interface ConnectorMainNodeUi<T extends IConnectorGroupApi<T>> {
  type: ConnectorNodeType.Aql
  isNegated: boolean
  indexInGroup: number | null

  convertToApi(): IConnectorGroupApi<T>
}
