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
