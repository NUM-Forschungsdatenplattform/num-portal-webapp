/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  simpleDescription?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: ProjectCategory[]
  startDate?: string
  endDate?: string
  financed?: boolean
  usedOutsideEu?: boolean
  id?: number | null
  modifiedDate?: string
  name?: string
  researchers?: IProjectUser[]
  status?: ProjectStatus
  templates?: IProjectTemplateInfoApi[]
}
