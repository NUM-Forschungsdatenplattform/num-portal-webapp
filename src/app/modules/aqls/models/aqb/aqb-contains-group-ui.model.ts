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

import { IAqbContainmentNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-containment-node.interface'
import { IAqbLogicalOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-logical-operator-node.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbContainsItemUiModel } from './aqb-contains-item-ui.model'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>
export class AqbContainsGroupUiModel {
  readonly type = ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  children: (AqbContainsItemUiModel | AqbContainsGroupUiModel)[]
  indexInGroup: number | null = null

  constructor() {
    this.logicalOperator = LogicalOperator.And
    this.children = []
  }

  convertToApi(): PossibleContains {
    if (this.children.length === 0) {
      return undefined
    } else if (this.children.length === 1) {
      return this.children[0].convertToApi()
    } else if (this.children.length > 1) {
      const mappedChildren = this.children
        .map((child) => child.convertToApi())
        .filter((mappedChild) => mappedChild !== undefined)

      if (mappedChildren.length === 1) {
        return mappedChildren[0]
      } else if (mappedChildren.length > 1) {
        return {
          _type: AqbNodeType.LogicalOperator,
          symbol: this.logicalOperator,
          values: mappedChildren,
        } as IAqbLogicalOperatorNode<PossibleContains>
      }
    }
  }

  collectArchetypeReferences(references: string[]): string[] {
    return this.children.reduce((arr, item) => {
      if (item instanceof AqbContainsItemUiModel) {
        arr.push(item.archetypeId)
        return arr
      } else {
        return item.collectArchetypeReferences(arr)
      }
    }, references)
  }
}
