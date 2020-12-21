import { AqbNodeType } from './aqb-node-type.enum'
import { IAqbLogicalOperatorNode } from './aqb-logical-operator-node.interface'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>

/**
 * A containment node inside the contains clause
 */
export interface IAqbContainmentNode {
  /**
   * The identifier of the node
   */
  _type: AqbNodeType.Containment

  /**
   * The id of this containment node.
   * **This is the reference id for the select fields**
   */
  id: number

  /**
   * The archetype id from the template containment
   */
  archetypeId: string

  /**
   * Another nested containment or logical-operator node
   */
  contains?: PossibleContains
}
