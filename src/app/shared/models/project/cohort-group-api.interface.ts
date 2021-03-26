import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { IConnectorGroupApi } from '../connectorGroupApi.interface'

/**
 * Either a CohortGroup or Phenotype
 */
export interface ICohortGroupApi extends IConnectorGroupApi {
  /**
   * The unique identifier
   */
  id?: number

  /**
   * Type of the cohort group
   */
  type: ConnectorNodeType

  /**
   * Cohort group operation to be applied to the children
   */
  operator?: LogicalOperator

  /**
   * Children of the cohort group in case the type of the group is: GROUP; can be other groups or phenotypes
   */
  children?: ICohortGroupApi[]

  /**
   * Reference to phenotype in case the type of the group is: PHENOTYPE
   */
  phenotypeId?: number

  /**
   * Cohort group parameter map representing the name of the aql parameter and the corresponding value
   */
  parameters?: { [Key: string]: string }
}
