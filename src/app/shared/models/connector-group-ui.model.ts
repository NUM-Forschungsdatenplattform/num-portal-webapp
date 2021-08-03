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

  public convertToUi(apiGroup: IConnectorGroupApi<T>, isNegated: boolean = false): void {
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
