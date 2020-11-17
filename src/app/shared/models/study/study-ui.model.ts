import { CohortGroupUiModel } from './cohort-group-ui.model'
import { IStudyApi } from './study-api.interface'

export class StudyUiModel {
  id: number | null
  studyId: number | null
  name: string
  description?: string
  cohortGroup: CohortGroupUiModel
  constructor(apiStudy?: IStudyApi) {
    this.id = apiStudy?.id || null
    this.studyId = apiStudy?.studyId
    this.name = apiStudy?.name
    this.description = apiStudy?.description || undefined
    this.cohortGroup = new CohortGroupUiModel()
  }
}
