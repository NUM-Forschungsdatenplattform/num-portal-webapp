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

import { IAqbComparisonOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator-node.interface'
import { IAqbLogicalOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-logical-operator-node.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbWhereItemUiModel } from './aqb-where-item-ui.model'

type PossibleWheres = IAqbComparisonOperatorNode | IAqbLogicalOperatorNode<PossibleWheres>
type PossibleChildren = AqbWhereItemUiModel | AqbWhereGroupUiModel

export class AqbWhereGroupUiModel {
  readonly type = ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or = LogicalOperator.And
  children: PossibleChildren[] = []
  indexInGroup: number | null = null

  constructor(baseGroup = false) {
    if (baseGroup) {
      const templateRestrictionGroup = new AqbWhereGroupUiModel()
      templateRestrictionGroup.logicalOperator = LogicalOperator.Or
      this.children.push(templateRestrictionGroup)
      this.children.push(new AqbWhereGroupUiModel())
    }
  }

  private getOperatorNode(values: PossibleWheres[]): IAqbLogicalOperatorNode<PossibleWheres> {
    return {
      _type: AqbNodeType.LogicalOperator,
      symbol: this.logicalOperator,
      values,
    }
  }

  private convertToBinaryTree(children: PossibleWheres[]): {
    result: IAqbLogicalOperatorNode<PossibleWheres>
    _: any
  } {
    const initialAndResultingValue = this.getOperatorNode([])

    const inputLength = children.length
    const _ = children.reduce((acc: IAqbLogicalOperatorNode<PossibleWheres>, current, index) => {
      if (acc.values.length >= 1 && index !== inputLength - 1) {
        const node = this.getOperatorNode([current])
        acc.values.push(node)
        return acc.values[1]
      } else {
        acc.values.push(current)
        return acc
      }
    }, initialAndResultingValue)

    return {
      result: initialAndResultingValue,
      _,
    }
  }

  convertToApi(): PossibleWheres {
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
      } else if (mappedChildren.length === 2) {
        return {
          _type: AqbNodeType.LogicalOperator,
          symbol: this.logicalOperator,
          values: mappedChildren,
        } as IAqbLogicalOperatorNode<PossibleWheres>
      } else if (mappedChildren.length > 2) {
        return this.convertToBinaryTree(mappedChildren).result
      }
    }
  }

  handleDeletionByComposition(referenceIds: number[]): void {
    this.children.forEach((child) => {
      if (child instanceof AqbWhereGroupUiModel) {
        child.handleDeletionByComposition(referenceIds)
      }
    })

    this.children = this.children.filter((item) => {
      if (item instanceof AqbWhereGroupUiModel) {
        return item.children.length > 0 ? true : false
      }

      return !referenceIds.includes(item.compositionReferenceId)
    })
  }

  handleDeletionByArchetype(referenceIds: number[]): void {
    this.children.forEach((child) => {
      if (child instanceof AqbWhereGroupUiModel) {
        child.handleDeletionByArchetype(referenceIds)
      }
    })

    this.children = this.children.filter((item) => {
      if (item instanceof AqbWhereGroupUiModel) {
        return item.children.length > 0 ? true : false
      }

      return !referenceIds.includes(item.archetypeReferenceId)
    })
  }
}
