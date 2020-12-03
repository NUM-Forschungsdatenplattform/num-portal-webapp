import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'
import { IStudyUserDetailApi } from './study-user.detail-api.interface'

export interface IStudyApi {
  cohortId?: number
  coordinator?: IStudyUserDetailApi
  createDate?: Date
  description?: string
  firstHypotheses?: string
  id?: number | null
  modifiedDate?: Date
  name?: string
  researchers?: IStudyUserDetailApi[]
  secondHypotheses?: string
  status?: StudyStatus
  templates?: IStudyTemplateInfoApi
}
