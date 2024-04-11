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
