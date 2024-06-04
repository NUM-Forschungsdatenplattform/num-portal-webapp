/**
 * Represents a simple value node for the comparison value in the where clause
 */
export interface IAqbSimpleValueNode {
  /**
   * The identifier
   */
  _type: string

  /**
   * The specified value
   */
  value: string | number
}
