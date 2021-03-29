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

import { IAqbSelectFieldNode } from './aqb-select-field-node.interface'
import { AqbSelectTopDirection } from './aqb-select-top-direction.enum'

/**
 * The (root) select-clause of the aql-builder-model.
 * It Includes all select statements
 */
export interface IAqbSelectClause {
  /**
   * The number of records to return
   */
  topCount?: number

  /**
   * The direction of topCount
   */
  topDirection?: AqbSelectTopDirection

  /**
   * The selected template elements specifying the result to be returned
   */
  statement: IAqbSelectFieldNode[]
}
