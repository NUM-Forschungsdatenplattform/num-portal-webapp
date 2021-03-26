import { ProjectCategory } from 'src/app/modules/projects/models/project-category.enum'
import { IProjectUser } from '../user/project-user.interface'
import { IUser } from '../user/user.interface'
import { ProjectStatus } from './project-status.enum'
import { IProjectTemplateInfoApi } from './project-template-info-api.interface'

export interface IProjectApi {
  cohortId?: number
  coordinator?: IUser
  createDate?: string
  goal?: string
  description?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: ProjectCategory[]
  startDate?: string
  endDate?: string
  financed?: boolean
  id?: number | null
  modifiedDate?: string
  name?: string
  researchers?: IProjectUser[]
  status?: ProjectStatus
  templates?: IProjectTemplateInfoApi[]
}
