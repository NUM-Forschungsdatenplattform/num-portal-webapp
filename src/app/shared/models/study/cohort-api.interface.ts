import { ICohortGroupApi } from './cohort-group-api.interface'

export interface ICohortApi {
  cohortGroup: ICohortGroupApi
  description?: string
  id: number | null
  name: string
  studyId: number
}
