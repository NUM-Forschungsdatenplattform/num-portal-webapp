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

/**
 * A field in a template to be selected. To be used as a statement in the select clause
 */
export interface IAqbSelectFieldNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.SelectField

  /**
   * The id of the referenced containment node in the contains clause
   */
  containmentId: number

  /**
   * The name of the selected field.
   * To be used to define the alias of the field
   */
  name: string

  /**
   * The path to the selected field
   */
  aqlPath: string
}
