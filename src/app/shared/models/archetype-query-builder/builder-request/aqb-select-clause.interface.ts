import { IAqbSelectFieldNode } from './aqb-select-field-node.interface'
import { AqbSelectTopDirection } from './aqb-select-top-direction.enum'

/**
 * The (root) select-clause of the aql-builder-model.
 * It Includes all select statements
 */
export interface IAqbSelectClause {
  /**
   * The number of records to return
   */
  topCount?: number

  /**
   * The direction of topCount
   */
  topDirection?: AqbSelectTopDirection

  /**
   * The selected template elements specifying the result to be returned
   */
  statement: IAqbSelectFieldNode[]
}
