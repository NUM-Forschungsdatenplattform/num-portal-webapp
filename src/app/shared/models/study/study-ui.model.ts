import { IStudyUser } from '../user/study-user.interface'
import { IUser } from '../user/user.interface'
import { ICohortGroupApi } from './cohort-group-api.interface'
import { CohortGroupUiModel } from './cohort-group-ui.model'
import { IStudyApi } from './study-api.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'
import { DialogSize } from '../dialog/dialog-size.enum'

export class StudyUiModel {
  cohortId: number | null
  cohortGroup: CohortGroupUiModel
  /** The coordinator of the study. Is automatically asigned based on the auth-token */
  coordinator?: IStudyUser
  description?: string
  firstHypotheses?: string
  id: number | null
  modifiedDate?: Date
  name?: string
  researchers: IUser[]
  secondHypotheses?: string
  status: StudyStatus
  templates: IStudyTemplateInfoApi[]

  constructor(apiStudy?: IStudyApi, researchers?: IUser[], cohortGroup?: CohortGroupUiModel) {
    this.coordinator = apiStudy?.coordinator || undefined
    this.description = apiStudy?.description || undefined
    this.firstHypotheses = apiStudy?.firstHypotheses || undefined
    this.id = apiStudy?.id || null
    this.modifiedDate = apiStudy?.modifiedDate || undefined
    this.name = apiStudy?.name || undefined
    this.secondHypotheses = apiStudy?.secondHypotheses || undefined
    this.status = apiStudy?.status || StudyStatus.Draft
    this.cohortGroup = cohortGroup || new CohortGroupUiModel()
    this.researchers = researchers || []
    this.templates = apiStudy?.templates || []
  }

  public convertToApiInterface(
    id?: number,
    name?: string,
    description?: string,
    firstHypotheses?: string,
    secondHypotheses?: string,
    cohortId?: number
  ): { study: IStudyApi; cohortGroup: ICohortGroupApi } {
    const study: IStudyApi = {
      description: description || this.description,
      id: id || this.id,
      name: name || this.name,
      firstHypotheses: firstHypotheses || this.firstHypotheses,
      secondHypotheses: secondHypotheses || this.secondHypotheses,
      cohortId: cohortId || this.cohortId,
      researchers: this.getResearchersForApi(),
      status: this.status,
      templates: this.templates,
    }

    const cohortGroup = this.cohortGroup.convertToApi()

    return { study, cohortGroup }
  }

  private getResearchersForApi(): IStudyUser[] {
    return this.researchers.map((researcher) => {
      return {
        userId: researcher.id,
        organizationId: researcher.organization?.id,
        approved: researcher.approved,
      }
    })
  }

  public getDisableStatusBasedStudyStatus(studyStatus: StudyStatus): boolean {
    switch (studyStatus) {
      case StudyStatus.Draft:
        return false
      case StudyStatus.Change_request:
        return false
      case StudyStatus.Pending:
        return true
      case StudyStatus.Approved:
        return true
      case StudyStatus.Published:
        return true
      case StudyStatus.Reviewing:
        return true
      case StudyStatus.Denied:
        return true
      case StudyStatus.Closed:
        return true
      default:
        return true
    }
  }
}
