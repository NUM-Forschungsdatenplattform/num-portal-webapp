import { AqbNodeType } from './aqb-node-type.enum'

/**
 * Represents a simple value node for the comparison value in the where clause
 */
export interface IAqbIdentifiedPathValueNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.IdentifiedPath

  root: {
    _type: 'Containment'
    identifier: string
  }
}
