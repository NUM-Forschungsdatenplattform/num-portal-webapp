import { ConnectorNodeType } from './connector-node-type.enum'
import { LogicalOperator } from './logical-operator.enum'
import { IConnectorGroupApi } from './connectorGroupApi.interface'
import { ConnectorMainNodeUi } from './connector-main-node-ui.interface'

export abstract class ConnectorGroupUiModel {
  abstract type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (ConnectorGroupUiModel | ConnectorMainNodeUi)[]
  indexInGroup: number | null = null
  constructor() {
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  abstract mapChildrenToUi: (
    child: ConnectorGroupUiModel | ConnectorMainNodeUi
  ) => ConnectorGroupUiModel | ConnectorMainNodeUi

  public convertToUi(apiGroup: IConnectorGroupApi, isNegated: boolean = false): void {
    this.isNegated = isNegated
    this.logicalOperator =
      apiGroup.operator === LogicalOperator.And ? LogicalOperator.And : LogicalOperator.Or

    if (apiGroup.children.length) {
      this.children = apiGroup.children.map(this.mapChildrenToUi)
    }
  }

  public convertToApi(): IConnectorGroupApi | null {
    const convertedGroup = this.isNegated
      ? this.convertGroupToNegatedApiGroup()
      : this.convertGroupToApiGroup()

    return convertedGroup
  }

  private convertGroupToApiGroup(): IConnectorGroupApi | null {
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
    }
  }

  private convertGroupToNegatedApiGroup(): IConnectorGroupApi | null {
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
        },
      ],
    }
  }

  private mapChildrentoApi = (
    child: ConnectorGroupUiModel | ConnectorMainNodeUi
  ): IConnectorGroupApi | null => {
    return child.convertToApi()
  }
}
