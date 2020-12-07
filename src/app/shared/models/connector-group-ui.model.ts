import { ConnectorNodeType } from './connector-node-type.enum'
import { LogicalOperator } from './logical-operator.enum'
import { IConnectorGroupApi } from './connectorGroupApi.interface'
import { ConnectorMainNodeUi } from './connector-main-node-ui.interface'

export abstract class ConnectorGroupUiModel {
  abstract type: ConnectorNodeType.Group | ConnectorNodeType.CohortGroup
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

  public convertToApi(): IConnectorGroupApi {
    return this.isNegated ? this.convertGroupToNegatedApiGroup() : this.convertGroupToApiGroup()
  }

  private convertGroupToApiGroup(): IConnectorGroupApi {
    return {
      type: this.type,
      operator: this.logicalOperator,
      children: this.children.map(this.mapChildrentoApi),
    }
  }

  private convertGroupToNegatedApiGroup(): IConnectorGroupApi {
    return {
      type: this.type,
      operator: LogicalOperator.Not,
      children: [
        {
          type: this.type,
          operator: this.logicalOperator,
          children: this.children.map(this.mapChildrentoApi),
        },
      ],
    }
  }

  private mapChildrentoApi = (
    child: ConnectorGroupUiModel | ConnectorMainNodeUi
  ): IConnectorGroupApi => {
    return child.convertToApi()
  }
}
