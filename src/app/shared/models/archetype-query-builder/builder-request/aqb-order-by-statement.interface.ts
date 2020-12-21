import { AqbOrderBy } from './aqb-order-by.enum'
import { IAqbSelectFieldNode } from './aqb-select-field-node.interface'

/**
 * Model to specify the ordering of a SelectField
 */
export interface IAqbOrderByStatement {
  /**
   * The Ordering. ASC or DESC
   */
  symbol: AqbOrderBy

  /**
   * The SelectField affected by the ordering
   */
  statement: IAqbSelectFieldNode
}
