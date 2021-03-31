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

import { IAqbOrderByStatement } from './builder-request/aqb-order-by-statement.interface'
import { IAqbSelectClause } from './builder-request/aqb-select-clause.interface'
import { IAqbComparisonOperatorNode } from './builder-request/aqb-comparison-operator-node.interface'
import { IAqbContainmentNode } from './builder-request/aqb-containment-node.interface'
import { IAqbLogicalOperatorNode } from './builder-request/aqb-logical-operator-node.interface'

type PossibleWhereStatements =
  | IAqbComparisonOperatorNode
  | IAqbLogicalOperatorNode<PossibleWhereStatements>

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>

export interface IArchetypeQueryBuilder {
  select: IAqbSelectClause
  ehr?: {
    containmentId: number
  }
  contains: PossibleContains
  orderBy?: IAqbOrderByStatement[]
  where?: PossibleWhereStatements
}
