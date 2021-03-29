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

import { DateHelperService } from 'src/app/core/helper/date-helper.service'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { mockUser, mockUserSuperAdmin } from './admin.mock'

export const mockProject1: IProjectApi = {
  id: 1,
  name: 'Test Title',
  description: 'Test Description',
  goal: 'Test Goal',
  templates: [],
  cohortId: 1,
  coordinator: mockUserSuperAdmin,
  researchers: [],
  firstHypotheses: 'Test Hypothesis',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
}

export const mockProject2: IProjectApi = {
  id: 2,
  name: 'Test Title 2',
  description: 'Test Description 2',
  templates: [],
  cohortId: 2,
  coordinator: mockUser,
  researchers: [
    {
      userId: 'abc-1',
    },
    {
      userId: 'abc-2',
    },
  ],
  firstHypotheses: 'Test Hypothesis',
  status: ProjectStatus.Pending,
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
}

export const mockProject3: IProjectApi = {
  id: 3,
  name: 'Test Title 3',
  description: 'Test Description 3',
  templates: [],
  cohortId: 3,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
    {
      userId: 'abc-2',
    },
    {
      userId: '123-456',
    },
  ],
  firstHypotheses: 'Test Hypothesis',
  status: ProjectStatus.Published,
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
}

export const mockProjects = [mockProject1, mockProject2]

export const mockProjects1 = [mockProject1, mockProject2, mockProject3]
