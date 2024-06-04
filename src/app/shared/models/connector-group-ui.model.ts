import { ConnectorNodeType } from './connector-node-type.enum'
import { LogicalOperator } from './logical-operator.enum'
import { IConnectorGroupApi } from './connectorGroupApi.interface'
import { ConnectorMainNodeUi } from './connector-main-node-ui.interface'

export abstract class ConnectorGroupUiModel<T extends IConnectorGroupApi<T>> {
  abstract type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (ConnectorGroupUiModel<T> | ConnectorMainNodeUi<T>)[]
  indexInGroup: number | null = null
  constructor() {
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  abstract mapChildrenToUi: (
    child: IConnectorGroupApi<T>
  ) => ConnectorGroupUiModel<T> | ConnectorMainNodeUi<T>

  public convertToUi(apiGroup: IConnectorGroupApi<T>, isNegated = false): void {
    this.isNegated = isNegated
    this.logicalOperator =
      apiGroup.operator === LogicalOperator.And ? LogicalOperator.And : LogicalOperator.Or

    if (apiGroup.children.length) {
      this.children = apiGroup.children.map(this.mapChildrenToUi)
    }
  }

  public convertToApi(): IConnectorGroupApi<T> | null {
    const convertedGroup = this.isNegated
      ? this.convertGroupToNegatedApiGroup()
      : this.convertGroupToApiGroup()

    return convertedGroup
  }

  private convertGroupToApiGroup(): IConnectorGroupApi<T> | null {
    const mappedChildren = this.children
      .map(this.mapChildrentoApi)
      .filter((child) => child !== null)
    if (!mappedChildren.length) {
      /** No empty groups */
      return null
    }
    return {
      type: this.type,
      operator: this.logicalOperator,
      children: mappedChildren,
    } as T
  }

  private convertGroupToNegatedApiGroup(): IConnectorGroupApi<T> | null {
    const mappedChildren = this.children
      .map(this.mapChildrentoApi)
      .filter((child) => child !== null)
    if (!mappedChildren.length) {
      /** No empty groups */
      return null
    }
    return {
      type: this.type,
      operator: LogicalOperator.Not,
      children: [
        {
          type: this.type,
          operator: this.logicalOperator,
          children: mappedChildren,
        } as T,
      ],
    }
  }

  private mapChildrentoApi = (
    child: ConnectorGroupUiModel<T> | ConnectorMainNodeUi<T>
  ): IConnectorGroupApi<T> | null => {
    return child.convertToApi()
  }
}
