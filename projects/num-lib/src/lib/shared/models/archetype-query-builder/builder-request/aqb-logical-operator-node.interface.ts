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

import { LogicalOperator } from '../../logical-operator.enum'
import { AqbNodeType } from './aqb-node-type.enum'

/**
 * Element for applying a logical operator to elements in the where clause or contains clause
 */
export interface IAqbLogicalOperatorNode<T> {
  /**
   * The identifier
   */
  _type: AqbNodeType.LogicalOperator

  /**
   * The applied logical operator.
   * Backend supports AND, OR
   */
  symbol: LogicalOperator.And | LogicalOperator.Or

  /**
   * The values where the logical operator is applied to
   */
  values: T[]
}
