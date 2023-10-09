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

import { IAqbContainmentNode } from '../archetype-query-builder/builder-request/aqb-containment-node.interface'
import { IAqbLogicalOperatorNode } from '../archetype-query-builder/builder-request/aqb-logical-operator-node.interface'
import { AqbNodeType } from '../archetype-query-builder/builder-request/aqb-node-type.enum'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { LogicalOperator } from '../logical-operator.enum'
import { AqbContainsGroupUiModel } from './aqb-contains-group-ui.model'
import { AqbContainsItemUiModel } from './aqb-contains-item-ui.model'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>
export class AqbContainsCompositionUiModel {
  type = ConnectorNodeType.Aqb_Composition
  indexInGroup: number | null = null
  existingItems = new Map<number, boolean>()
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  children: (AqbContainsItemUiModel | AqbContainsGroupUiModel)[]
  templateId: string
  compositionId: string
  compositionReferenceId: number

  constructor(templateId: string, compositionId: string, compositionReferenceId: number) {
    this.logicalOperator = LogicalOperator.And
    this.children = []
    this.templateId = templateId
    this.compositionId = compositionId
    this.compositionReferenceId = compositionReferenceId
  }

  setContainsItem(archetypeId: string, archetypeReferenceId: number): void {
    const isExisting = !!this.existingItems.get(archetypeReferenceId)
    if (!isExisting && archetypeId !== this.compositionId) {
      const containsItem = new AqbContainsItemUiModel(
        this.compositionId,
        this.compositionReferenceId,
        archetypeId,
        archetypeReferenceId
      )
      this.children.push(containsItem)
      this.existingItems.set(archetypeReferenceId, true)
    }
  }

  convertToApi(): IAqbContainmentNode {
    let subContains: PossibleContains
    if (this.children.length === 1) {
      subContains = this.children[0].convertToApi()
    } else if (this.children.length > 1) {
      subContains = {
        _type: AqbNodeType.LogicalOperator,
        symbol: this.logicalOperator,
        values: this.children.map((child) => child.convertToApi()),
      }
    }
    return {
      _type: AqbNodeType.Containment,
      id: this.compositionReferenceId,
      archetypeId: this.compositionId,
      contains: subContains,
    }
  }
}
