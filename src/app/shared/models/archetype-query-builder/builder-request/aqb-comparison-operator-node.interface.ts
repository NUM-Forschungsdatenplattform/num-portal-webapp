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

import { AqbComparisonOperator } from './aqb-comparison-operator.enum'
import { AqbNodeType } from './aqb-node-type.enum'
import { IAqbParameterNode } from './aqb-parameter-node.interface'
import { IAqbSimpleValueNode } from './aqb-simple-value-node.interface'
import { IAqbSelectFieldNode } from './aqb-select-field-node.interface'

/**
 * Element for applying a comparison in the where clause on a specific field
 */
export interface IAqbComparisonOperatorNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.ComparisonOperator

  /**
   * The field where the comparison is applied to
   */
  statement: IAqbSelectFieldNode

  /**
   * The applied comparison-operator
   */
  symbol: AqbComparisonOperator

  /**
   * The value to be checked against the select field.
   * Might be a value or parameter
   */
  value?: IAqbParameterNode | IAqbSimpleValueNode
}
