import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
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
