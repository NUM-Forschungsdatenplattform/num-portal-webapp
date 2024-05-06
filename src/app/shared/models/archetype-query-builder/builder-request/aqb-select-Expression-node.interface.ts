import { AqbNodeType } from './aqb-node-type.enum'
import { IAqbIdentifiedPathValueNode } from './aqb-IdentifiedPath-value-node.interface'

/**
 * A field in a template to be selected. To be used as a statement in the select clause
 */
export interface IAqbSelectExpressionNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.SelectExpression

  columnExpression: IAqbIdentifiedPathValueNode

  /**
   * The alias of the selected field.
   * To be used to define the alias of the field
   */
  alias: string
}
