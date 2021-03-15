import { DateHelperService } from 'src/app/core/helper/date-helper.service'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyCategory } from 'src/app/modules/studies/models/study-category.enum'
import { IDefinitionList } from '../definition-list.interface'
import { DefinitionType } from '../definition-type.enum'
import { LogicalOperator } from '../logical-operator.enum'
import { IStudyUser } from '../user/study-user.interface'
import { IUser } from '../user/user.interface'
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
  goal?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: StudyCategory[]
  startDate?: Date
  endDate?: Date
  financed?: boolean
  id: number | null
  modifiedDate?: Date
  name?: string
  researchers: IUser[]
  researchersApi: IStudyUser[]
  status: StudyStatus
  templates: IStudyTemplateInfoApi[]

  constructor(apiStudy?: IStudyApi, private phenotypeService?: PhenotypeService) {
    this.id = apiStudy?.id || null
    this.description = apiStudy?.description || undefined
    this.goal = apiStudy?.goal || undefined
    this.firstHypotheses = apiStudy?.firstHypotheses || undefined
    this.secondHypotheses = apiStudy?.secondHypotheses || undefined
    this.keywords = apiStudy?.keywords || []
    this.categories = apiStudy?.categories || []
    this.startDate = apiStudy?.startDate ? new Date(apiStudy.startDate) : new Date()
    this.endDate = apiStudy?.endDate
      ? new Date(apiStudy.endDate)
      : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    this.financed = apiStudy?.financed || false

    this.coordinator = apiStudy?.coordinator || undefined
    this.modifiedDate = apiStudy?.modifiedDate ? new Date(apiStudy?.modifiedDate) : undefined
    this.name = apiStudy?.name || undefined
    this.status = apiStudy?.status || StudyStatus.Draft
    this.cohortId = apiStudy?.cohortId || null
    this.researchers = []
    this.researchersApi = apiStudy?.researchers || []
    this.templates = apiStudy?.templates || []
    this.cohortGroup = new CohortGroupUiModel()
  }

  addCohortGroup(cohortGroup?: ICohortGroupApi): void {
    this.cohortGroup = new CohortGroupUiModel(undefined, this.phenotypeService)
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
    formValues?: StudyUiModel
  ): { study: IStudyApi; cohortGroup: ICohortGroupApi } {
    const study: IStudyApi = {
      id: id || this.id,
      name: formValues?.name || this.name,
      description: formValues?.description || this.description,
      goal: formValues?.goal || this.goal,
      firstHypotheses: formValues?.firstHypotheses || this.firstHypotheses,
      secondHypotheses: formValues?.secondHypotheses || this.secondHypotheses,
      keywords: formValues?.keywords || this.keywords,
      categories: formValues?.categories || this.categories,
      startDate: DateHelperService.getDateString(formValues.startDate || this.startDate),
      endDate: DateHelperService.getDateString(formValues?.endDate || this.endDate),
      financed: formValues?.financed,
      cohortId: formValues?.cohortId || this.cohortId,
      researchers: this.getResearchersForApi(),
      status: this.status,
      templates: this.templates,
    }

    const cohortGroup = this.cohortGroup.convertToApi()

    return { study, cohortGroup }
  }

  public getStudyPreviewGeneralInfo(): IDefinitionList[] {
    return [
      { title: 'FORM.TITLE', description: this.name },
      { title: 'FORM.DESCRIPTION', description: this.description },
      { title: 'FORM.GOAL', description: this.goal },
      { title: 'FORM.FIRST_HYPOTHESES', description: this.firstHypotheses },
      { title: 'FORM.SECOND_HYPOTHESES', description: this.secondHypotheses },
      { title: 'FORM.KEYWORDS', description: this.keywords, type: DefinitionType.Array },
      { title: 'FORM.CATEGORY', description: this.categories, type: DefinitionType.Array },
      {
        title: 'FORM.START_DATE',
        description: this.startDate || undefined,
        type: DefinitionType.Date,
      },
      {
        title: 'FORM.END_DATE',
        description: this.endDate || undefined,
        type: DefinitionType.Date,
      },
      {
        title: 'FORM.FINANCED_BY_PRIVATE',
        description: this.financed,
        type: DefinitionType.Boolean,
      },
    ]
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
