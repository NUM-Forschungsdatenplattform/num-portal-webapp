import { ICohortGroupApi } from './cohort-group-api.interface'

export interface IStudyApi {
  /**
   * The unique identifier
   */
  id: number | null

  /**
   * Reference to the study
   */
  studyId: number | null

  /**
   * The name of the cohort
   */
  name: string

  /**
   * The description of the cohort
   */
  description?: string

  cohortGroup: ICohortGroupApi
}
