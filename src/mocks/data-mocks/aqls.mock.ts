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
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { mockUser, mockUserStudyCoordinator } from './admin.mock'
import { mockUserProfile1 } from './user-profile.mock'

export const mockAql1: IAqlApi = {
  id: 1,
  name: 'name1',
  query: 'quer1',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql2: IAqlApi = {
  id: 2,
  name: 'name2',
  query: 'quer2',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql3: IAqlApi = {
  id: 3,
  name: 'name3 with parame',
  query: 'quer3 has this $parameter and also $this',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql4: IAqlApi = {
  id: 4,
  name: 'name4 with parameter',
  query: 'quer4 has just this $parameter',
  purpose: '',
  use: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
}

export const mockAql5: IAqlApi = {
  id: 5,
  name: 'b',
  query: 'query5',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUser,
  publicAql: true,
}

export const mockAql6: IAqlApi = {
  id: 6,
  name: 'a',
  query: 'query6',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUserStudyCoordinator,
  publicAql: false,
}

export const mockAql7: IAqlApi = {
  id: 7,
  name: 'A',
  query: 'query7',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUserStudyCoordinator,
  publicAql: true,
}

export const mockAql8: IAqlApi = {
  id: 8,
  name: 'ü',
  query: 'query8',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: '2020-01-01',
  modifiedDate: '2020-01-01',
  owner: mockUser,
  publicAql: false,
}

export const mockAql9: IAqlApi = {
  id: 9,
  name: '%',
  query: 'query9',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUser,
  publicAql: true,
}

export const mockAql10: IAqlApi = {
  id: 10,
  name: 'ö',
  query: 'query10',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUserProfile1,
  publicAql: true,
}

export const mockAql11: IAqlApi = {
  id: 11,
  name: '',
  query: 'query11',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUserProfile1,
  publicAql: true,
}

export const mockAql12: IAqlApi = {
  id: 12,
  name: '1',
  query: 'query12',
  purpose: 'Test sorting of AQLs',
  use: '',
  createDate: DateHelperService.getDateString(new Date()),
  modifiedDate: DateHelperService.getDateString(new Date()),
  owner: mockUserProfile1,
  publicAql: true,
}

export const mockAqlsToSort = [
  mockAql5,
  mockAql6,
  mockAql7,
  mockAql8,
  mockAql9,
  mockAql10,
  mockAql11,
  mockAql12,
]

export const mockAqls: IAqlApi[] = [mockAql1, mockAql2]

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export const mockAqlsToFilter: DeepPartial<IAqlApi>[] = [
  {
    id: 1,
    name: 'aqlName1',
    owner: {
      id: '1',
      firstName: '',
      lastName: '',
      organization: {
        id: 1,
      },
    },
  },
  {
    id: 2,
    name: 'aqlName2',
    owner: {
      id: '1',
      firstName: 'firstname2',
      lastName: null,
      organization: {
        id: null,
      },
    },
  },
  {
    id: 3,
    name: 'aqlName3',
    owner: {
      id: '1',
      firstName: null,
      lastName: null,
      organization: null,
    },
  },
  {
    id: 4,
    name: null,
    owner: {
      id: '2',
      firstName: 'firstName4',
      lastName: 'lastName4',
      organization: {
        id: 2,
      },
    },
  },
  {
    id: 44,
    name: null,
    owner: {
      id: '22',
      firstName: 'firstName4',
      lastName: 'lastName4',
      organization: null,
    },
  },
]
