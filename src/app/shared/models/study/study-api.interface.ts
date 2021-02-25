import { StudyCategories } from 'src/app/modules/studies/components/study-editor-general-info-categories-input/study-categories.enum'
import { IStudyUser } from '../user/study-user.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'

export interface IStudyApi {
  cohortId?: number
  coordinator?: IStudyUser
  createDate?: string // Date
  goal?: string
  description?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: StudyCategories[]
  startDate?: string // Date
  endDate?: string // Date
  financed?: boolean
  id?: number | null
  modifiedDate?: string // Date
  name?: string
  researchers?: IStudyUser[]
  status?: StudyStatus
  templates?: IStudyTemplateInfoApi[]
}
