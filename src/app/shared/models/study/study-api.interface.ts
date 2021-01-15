import { IStudyUser } from '../user/study-user.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'

export interface IStudyApi {
  cohortId?: number
  coordinator?: IStudyUser
  createDate?: Date
  description?: string
  firstHypotheses?: string
  id?: number | null
  modifiedDate?: Date
  name?: string
  researchers?: IStudyUser[]
  secondHypotheses?: string
  status?: StudyStatus
  templates?: IStudyTemplateInfoApi[]
}
