import { IContainmentNodeField } from './containment-node-field.interface'

/**
 * The archetype element / containment element
 */
export interface IContainmentNode {
  /**
   * The archetype id of the template element
   */
  archetypeId: string

  /**
   * The children of the template element
   */
  children: IContainmentNode[]

  /**
   * The containment field elements inside a template
   */
  fields: IContainmentNodeField[]
}
