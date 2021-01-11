import { LogicalOperator } from '../logical-operator.enum'
import { IStudyUser } from '../user/study-user.interface'
import { IUser } from '../user/user.interface'
import { ICohortApi } from './cohort-api.interface'
import { ICohortGroupApi } from './cohort-group-api.interface'
import { CohortGroupUiModel } from './cohort-group-ui.model'
import { IStudyApi } from './study-api.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'

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
  researchersApi: IStudyUser[]
  secondHypotheses?: string
  status: StudyStatus
  templates: IStudyTemplateInfoApi[]

  constructor(apiStudy?: IStudyApi) {
    this.coordinator = apiStudy?.coordinator || undefined
    this.description = apiStudy?.description || undefined
    this.firstHypotheses = apiStudy?.firstHypotheses || undefined
    this.id = apiStudy?.id || null
    this.modifiedDate = apiStudy?.modifiedDate || undefined
    this.name = apiStudy?.name || undefined
    this.secondHypotheses = apiStudy?.secondHypotheses || undefined
    this.status = apiStudy?.status || StudyStatus.Draft
    this.cohortId = apiStudy?.cohortId || null
    this.researchers = []
    this.researchersApi = apiStudy?.researchers || []
    this.templates = apiStudy?.templates || []
    this.cohortGroup = new CohortGroupUiModel()
  }

  addCohortGroup(cohortGroup?: ICohortGroupApi): void {
    this.cohortGroup = new CohortGroupUiModel()
    if (!cohortGroup) {
      return
    }
    if (cohortGroup.operator === LogicalOperator.Not) {
      const isNegated = true
      const firstChild = cohortGroup.children[0]
      this.cohortGroup.convertToUi(firstChild, isNegated)
    } else {
      this.cohortGroup.convertToUi(cohortGroup, false)
    }
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
}
