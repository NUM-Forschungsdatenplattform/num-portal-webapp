import { ITemplateMetaData } from '../template-metadata.interface'
import { CohortGroupUiModel } from './cohort-group-ui.model'
import { IStudyApi } from './study-api.interface'
import { StudyStatus } from './study-status.enum'

export class StudyUiModel {
  cohortGroup: CohortGroupUiModel
  /** The coordinator of the study. Is automatically based on the auth-token */
  coordinator?: any // TODO
  description?: string
  firstHypotheses?: string
  id: number | null
  modifiedDate?: Date
  name?: string
  researchers: any[] // TODO
  secondHypotheses?: string
  status: StudyStatus
  templates: ITemplateMetaData[]

  constructor(apiStudy?: IStudyApi) {
    this.coordinator = apiStudy?.coordinator || undefined
    this.description = apiStudy?.description || undefined
    this.firstHypotheses = apiStudy?.firstHypotheses || undefined
    this.id = apiStudy?.id || null
    this.modifiedDate = apiStudy?.modifiedDate || undefined
    this.name = apiStudy?.name || undefined
    this.secondHypotheses = apiStudy?.secondHypotheses || undefined
    this.status = apiStudy?.status || StudyStatus.Draft

    this.cohortGroup = new CohortGroupUiModel()

    // this.researchers =
    // this.templates =
  }
}
