import { StudyCategory } from 'src/app/modules/studies/models/study-category.enum'
import { IStudyUser } from '../user/study-user.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'

export interface IStudyApi {
  cohortId?: number
  coordinator?: IStudyUser
  createDate?: string
  goal?: string
  description?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: StudyCategory[]
  startDate?: string
  endDate?: string
  financed?: boolean
  id?: number | null
  modifiedDate?: string
  name?: string
  researchers?: IStudyUser[]
  status?: StudyStatus
  templates?: IStudyTemplateInfoApi[]
}
