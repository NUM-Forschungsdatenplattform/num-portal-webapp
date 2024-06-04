import { ReferenceModelType } from '../referencemodel-type.enum'

/**
 * The containment field element inside a template
 */
export interface IContainmentNodeField {
  /**
   * The name of the field
   */
  name: string

  /**
   * The reference model type (may not be complete)
   */
  rmType: ReferenceModelType

  /**
   * The machine-readable path to the field
   */
  aqlPath: string

  /**
   * The human-readable path
   */
  humanReadablePath: string
}
