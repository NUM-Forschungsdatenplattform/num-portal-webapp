import { IConnectorGroupApi } from '../connectorGroupApi.interface'
import { IAqlCohortApi } from '../aql/aql-cohort.interface'
import { IDictionary } from '../dictionary.interface'

/**
 * Either a CohortGroup or AQL
 */
export interface ICohortGroupApi extends IConnectorGroupApi<ICohortGroupApi> {
  /**
   * The unique identifier
   */
  id?: number

  /**
   * The AQL
   */
  query?: IAqlCohortApi

  /**
   * Cohort group parameter map representing the name of the aql parameter and the corresponding value
   */
  parameters?: IDictionary<string, string>
}
