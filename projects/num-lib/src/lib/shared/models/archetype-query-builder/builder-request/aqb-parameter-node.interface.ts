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

import { ReferenceModelType } from '../referencemodel-type.enum'
import { AqbNodeType } from './aqb-node-type.enum'

/**
 * Represents a parameter node for the comparison value in the where clause
 */
export interface IAqbParameterNode {
  /**
   * The identifier of the node
   */
  _type: AqbNodeType.ParameterValue

  /**
   * The name of the parameter
   */
  name: string

  /**
   * The type of the parameter.
   * **NOT** the identifier
   */
  type: ReferenceModelType
}
