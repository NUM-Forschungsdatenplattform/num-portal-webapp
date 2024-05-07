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
   * RM class name, such as EHR, COMPOSITION, OBSERVATION etc.
   */
  type?: string

  /**
   * AQL variable name
   */
  identifier?: string

  /**
   * A standard predicate or an archetype predicate.
   */
  predicates?: string

  /**
   * Another nested containment or logical-operator node
   */
  contains?: PossibleContains
}
