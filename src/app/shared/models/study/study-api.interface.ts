import { IUserDetails } from '../user/user-details.interface'
import { StudyStatus } from './study-status.enum'
import { IStudyTemplateInfoApi } from './study-template-info-api.interface'

export interface IStudyApi {
  cohortId?: number
  coordinator?: IUserDetails
  createDate?: Date
  description?: string
  firstHypotheses?: string
  id?: number | null
  modifiedDate?: Date
  name?: string
  researchers?: IUserDetails[]
  secondHypotheses?: string
  status?: StudyStatus
  templates?: IStudyTemplateInfoApi[]
}
