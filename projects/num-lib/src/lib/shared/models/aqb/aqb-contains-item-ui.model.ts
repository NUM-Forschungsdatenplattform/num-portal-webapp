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

import { IAqbContainmentNode } from "../archetype-query-builder/builder-request/aqb-containment-node.interface"
import { AqbNodeType } from "../archetype-query-builder/builder-request/aqb-node-type.enum"
import { ConnectorNodeType } from "../connector-node-type.enum"


export class AqbContainsItemUiModel {
  readonly type = ConnectorNodeType.Aqb_Item
  compositionId: string
  compositionReferenceId: number
  archetypeId: string
  archetypeReferenceId: number
  constructor(
    compositionId: string,
    compositionReferenceId: number,
    archetypeId: string,
    archetypeReferenceId: number
  ) {
    this.compositionId = compositionId
    this.compositionReferenceId = compositionReferenceId
    this.archetypeId = archetypeId
    this.archetypeReferenceId = archetypeReferenceId
  }

  convertToApi(): IAqbContainmentNode {
    return {
      _type: AqbNodeType.Containment,
      archetypeId: this.archetypeId,
      id: this.archetypeReferenceId,
    }
  }
}
