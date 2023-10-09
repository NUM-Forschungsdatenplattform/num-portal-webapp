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

import { AqbNodeType } from './aqb-node-type.enum'
import { IAqbLogicalOperatorNode } from './aqb-logical-operator-node.interface'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>

/**
 * A containment node inside the contains clause
 */
export interface IAqbContainmentNode {
  /**
   * The identifier of the node
   */
  _type: AqbNodeType.Containment

  /**
   * The id of this containment node.
   * **This is the reference id for the select fields**
   */
  id: number

  /**
   * The archetype id from the template containment
   */
  archetypeId: string

  /**
   * Another nested containment or logical-operator node
   */
  contains?: PossibleContains
}
