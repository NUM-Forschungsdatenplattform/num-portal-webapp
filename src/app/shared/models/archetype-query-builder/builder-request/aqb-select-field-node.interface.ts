import { AqbNodeType } from './aqb-node-type.enum'

/**
 * A field in a template to be selected. To be used as a statement in the select clause
 */
export interface IAqbSelectFieldNode {
  /**
   * The identifier
   */
  _type: AqbNodeType.SelectField

  /**
   * The id of the referenced containment node in the contains clause
   */
  containmentId: number

  /**
   * The name of the selected field.
   * To be used to define the alias of the field
   */
  name: string

  /**
   * The path to the selected field
   */
  aqlPath: string
}
