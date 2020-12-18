import { AqbNodeType } from './aqb-node-type.enum'

/**
 * Represents a simple value node for the comparison value in the where clause
 */
export interface IAqbSimpleValueNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.SimpleValue

  /**
   * The specified value
   */
  value: string | number
}
