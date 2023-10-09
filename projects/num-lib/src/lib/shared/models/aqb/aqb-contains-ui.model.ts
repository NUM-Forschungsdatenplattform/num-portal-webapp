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
import { LogicalOperator } from '../logical-operator.enum'
import { AqbContainsCompositionUiModel } from './aqb-contains-composition-ui.model'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>
export class AqbContainsUiModel {
  compositions = new Map<number, AqbContainsCompositionUiModel>()
  logicalOperator: LogicalOperator.And | LogicalOperator.Or

  constructor() {
    this.logicalOperator = LogicalOperator.And
  }

  setContains(
    templateId: string,
    compositionId: string,
    compositionReferenceId: number,
    archetypeId: string,
    archetypeReferenceId: number
  ): void {
    let composition = this.compositions.get(compositionReferenceId)
    if (composition === undefined || composition === null) {
      composition = new AqbContainsCompositionUiModel(
        templateId,
        compositionId,
        compositionReferenceId
      )
    }

    composition.setContainsItem(archetypeId, archetypeReferenceId)
    this.compositions.set(compositionReferenceId, composition)
  }

  deleteCompositions(compositionReferenceIds: number[]): void {
    compositionReferenceIds.forEach((compositionReferenceId) =>
      this.compositions.delete(compositionReferenceId)
    )
  }

  convertToApi(): PossibleContains {
    const compositions = Array.from(this.compositions.values())
    if (compositions.length > 1) {
      const contains: IAqbLogicalOperatorNode<PossibleContains> = {
        _type: AqbNodeType.LogicalOperator,
        symbol: LogicalOperator.Or,
        values: compositions.map((composition) => composition.convertToApi()),
      }
      return contains
    } else if (compositions.length) {
      return compositions[0].convertToApi()
    } else {
      return null
    }
  }
}
