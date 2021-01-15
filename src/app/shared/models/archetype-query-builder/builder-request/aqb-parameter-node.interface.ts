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
