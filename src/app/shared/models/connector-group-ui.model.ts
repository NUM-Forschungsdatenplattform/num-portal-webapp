/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
