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
import {
  mockUser,
  mockUserResearcher,
  mockUserStudyCoordinator,
  mockUserSuperAdmin,
} from './admin.mock'
import moment from 'moment'

export const mockProject1: IProjectApi = {
  id: 1,
  name: 'Test Title',
  description: 'Test Description',
  goal: 'Test Goal',
  templates: [],
  cohortId: 1,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      approved: true,
      userId: '123-abc',
    },
  ],
  firstHypotheses: 'Test Hypothesis',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
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
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
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
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject4: IProjectApi = {
  id: 4,
  name: 'filterText',
  description: 'Test Description 4',
  templates: [],
  cohortId: 4,
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
  status: ProjectStatus.Archived,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject5: IProjectApi = {
  id: 5,
  name: 'filterText',
  description: 'Test Description 5',
  templates: [],
  cohortId: 5,
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
  status: ProjectStatus.Closed,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject6: IProjectApi = {
  id: 6,
  name: 'Test project 6',
  description: 'Test Description 6',
  templates: [],
  cohortId: 6,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 6',
  status: ProjectStatus.Pending,
  createDate: DateHelperService.getDateString(moment('2000-02-01')),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject7: IProjectApi = {
  id: 7,
  name: 'Test project 7',
  description: 'Test Description 7',
  templates: [],
  cohortId: 6,
  coordinator: mockUserResearcher,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 7',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject8: IProjectApi = {
  id: 8,
  name: 'Test project 8',
  description: 'Test Description 8',
  templates: [],
  cohortId: 6,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 8',
  status: ProjectStatus.Pending,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject9: IProjectApi = {
  id: 9,
  name: 'test project',
  description: 'Test Project with lowercase for case insensitive check',
  templates: [],
  cohortId: 9,
  coordinator: mockUserResearcher,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 9',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject10: IProjectApi = {
  id: 10,
  name: 'Test project ö',
  description: 'Test Project with umlaut ö',
  templates: [],
  cohortId: 10,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 6',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject11: IProjectApi = {
  id: 11,
  name: 'Test project ä',
  description: 'Test project with umlaut ä',
  templates: [],
  cohortId: 11,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 11',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject12: IProjectApi = {
  id: 12,
  name: 'Test project ü',
  description: 'Test Description 12',
  templates: [],
  cohortId: 12,
  coordinator: mockUserResearcher,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 12',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject13: IProjectApi = {
  id: 13,
  name: 'Test project 13',
  description: 'Test Project with null on coordinator',
  templates: [],
  cohortId: 13,
  coordinator: mockUserResearcher,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 13',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject14: IProjectApi = {
  id: 14,
  name: 'TEST PROJECT',
  description: 'Test Project with uppercase name to check case insensitivity',
  templates: [],
  cohortId: 14,
  coordinator: mockUserResearcher,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 14',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject15: IProjectApi = {
  id: 15,
  name: 'Test ä',
  description: 'Test project for testing umlaut sorting',
  templates: [],
  cohortId: 15,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 15',
  status: ProjectStatus.Approved,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject16: IProjectApi = {
  id: 16,
  name: 'Test o',
  description: 'Test project for testing umlaut sorting',
  templates: [],
  cohortId: 16,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 16',
  status: ProjectStatus.ChangeRequest,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject17: IProjectApi = {
  id: 17,
  name: 'Test a',
  description: 'Test project for testing umlaut sorting',
  templates: [],
  cohortId: 17,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 17',
  status: ProjectStatus.Reviewing,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject18: IProjectApi = {
  id: 18,
  name: '',
  description: 'Test project for testing empty string',
  templates: [],
  cohortId: 18,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 18',
  status: ProjectStatus.Denied,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject19: IProjectApi = {
  id: 19,
  name: 'a',
  description: 'Test project for testing alphabetic sorting',
  templates: [],
  cohortId: 19,
  coordinator: mockUserSuperAdmin,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 19',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject20: IProjectApi = {
  id: 20,
  name: '1',
  description: 'Test project for testing numeric sorting',
  templates: [],
  cohortId: 20,
  coordinator: undefined,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 20',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProject21: IProjectApi = {
  id: 21,
  name: '%',
  description: 'Test project for testing special characters sorting',
  templates: [],
  cohortId: 21,
  coordinator: mockUserStudyCoordinator,
  researchers: [
    {
      userId: 'abc-1',
    },
  ],
  firstHypotheses: 'Test Hypothesis 21',
  status: ProjectStatus.Draft,
  createDate: DateHelperService.getDateString(moment('2036-03-06')),
  modifiedDate: DateHelperService.getDateString(moment()),
}

export const mockProjects = [mockProject1, mockProject2]

export const mockProjects1 = [mockProject1, mockProject2, mockProject3]

export const mockProjectsForSort = [
  mockProject6,
  mockProject7,
  mockProject8,
  mockProject9,
  mockProject10,
  mockProject11,
  mockProject12,
  mockProject13,
  mockProject14,
  mockProject15,
  mockProject16,
  mockProject17,
  mockProject18,
  mockProject19,
  mockProject20,
  mockProject21,
]
