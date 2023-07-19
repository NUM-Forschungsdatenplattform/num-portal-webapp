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
import { mockAqlCategory1, mockAqlCategory2, mockAqlCategory3 } from './aql-categories.mock'
import { IAqlCohortApi } from 'src/app/shared/models/aql/aql-cohort.interface'
import moment from 'moment'

const queryWithTwoParameter =
  "SELECT c0 as Height, c1 as Weight FROM EHR e contains (COMPOSITION c0[openEHR-EHR-COMPOSITION.registereintrag.v1] contains OBSERVATION o2[openEHR-EHR-OBSERVATION.height.v2] or COMPOSITION c1[openEHR-EHR-COMPOSITION.registereintrag.v1] contains OBSERVATION o3[openEHR-EHR-OBSERVATION.body_weight.v2]) WHERE ((c0/archetype_details/template_id/value = 'Körpergröße' or c1/archetype_details/template_id/value = 'Körpergewicht') and (o2/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude < $bodyHeight and o3/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude > $bodyWeight))"

export const mockAql1: IAqlApi = {
  id: 1,
  name: 'name1',
  nameTranslated: 'name1Translated',
  query: 'quer1',
  purpose: '',
  purposeTranslated: '',
  use: '',
  useTranslated: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
  categoryId: null,
}

export const mockAql2: IAqlApi = {
  id: 2,
  name: 'name2',
  nameTranslated: 'name2Translated',
  query: 'quer2',
  purpose: '',
  purposeTranslated: '',
  use: '',
  useTranslated: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
  categoryId: null,
}

export const mockAql3: IAqlApi = {
  id: 3,
  name: 'name3 with param',
  nameTranslated: 'name3 with param Translated',
  query: queryWithTwoParameter,
  purpose: '',
  purposeTranslated: '',
  use: '',
  useTranslated: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
  categoryId: mockAqlCategory2.id,
}

export const mockAql4: IAqlApi = {
  id: 4,
  name: 'name4 with parameter',
  nameTranslated: 'name4 with parameter Translated',
  query: 'quer4 has just this $parameter',
  purpose: '',
  purposeTranslated: '',
  use: '',
  useTranslated: '',
  createDate: '',
  modifiedDate: '',
  owner: mockUser,
  publicAql: true,
  categoryId: null,
}

export const mockAql5: IAqlApi = {
  id: 5,
  name: 'b',
  nameTranslated: 'bTranslated',
  query: 'query5',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUser,
  publicAql: true,
  categoryId: mockAqlCategory3.id,
}

export const mockAql6: IAqlApi = {
  id: 6,
  name: 'a',
  nameTranslated: 'aTranslated',
  query: 'query6',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUserStudyCoordinator,
  publicAql: false,
  categoryId: mockAqlCategory2.id,
}

export const mockAql7: IAqlApi = {
  id: 7,
  name: 'A',
  nameTranslated: 'ATranslated',
  query: 'query7',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUserStudyCoordinator,
  publicAql: true,
  categoryId: mockAqlCategory1.id,
}

export const mockAql8: IAqlApi = {
  id: 8,
  name: 'ü',
  nameTranslated: 'üTranslated',
  query: 'query8',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: '2020-01-01',
  modifiedDate: '2020-01-01',
  owner: mockUser,
  publicAql: false,
  categoryId: mockAqlCategory1.id,
}

export const mockAql9: IAqlApi = {
  id: 9,
  name: '%',
  nameTranslated: '%Translated',
  query: 'query9',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUser,
  publicAql: true,
  categoryId: mockAqlCategory3.id,
}

export const mockAql10: IAqlApi = {
  id: 10,
  name: 'ö',
  nameTranslated: 'öTranslated',
  query: 'query10',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUserProfile1,
  publicAql: true,
  categoryId: mockAqlCategory3.id,
}

export const mockAql11: IAqlApi = {
  id: 11,
  name: '',
  nameTranslated: '',
  query: 'query11',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUserProfile1,
  publicAql: true,
  categoryId: mockAqlCategory2.id,
}

export const mockAql12: IAqlApi = {
  id: 12,
  name: '1',
  nameTranslated: '1Translated',
  query: 'query12',
  purpose: 'Test sorting of AQLs',
  purposeTranslated: 'Test sorting of AQLsTranslated',
  use: '',
  useTranslated: '',
  createDate: DateHelperService.getDateString(moment()),
  modifiedDate: DateHelperService.getDateString(moment()),
  owner: mockUserProfile1,
  publicAql: true,
  categoryId: mockAqlCategory1.id,
}

export const mockAqlCohort: IAqlCohortApi = {
  id: 13,
  name: 'name3 with param',
  query: queryWithTwoParameter,
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
    nameTranslated: 'aqlName1Translated',
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
    nameTranslated: 'aqlName2Translated',
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
    nameTranslated: 'aqlName3Translated',
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
    nameTranslated: null,
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
    nameTranslated: null,
    owner: {
      id: '22',
      firstName: 'firstName4',
      lastName: 'lastName4',
      organization: null,
    },
  },
]

export const mockAqlsToFilterWithLanguage: DeepPartial<IAqlApi>[] = [
  {
    id: 1,
    name: 'germanName1',
    nameTranslated: 'englishName1',
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
    name: 'germanName2',
    nameTranslated: 'englishName2',
    owner: {
      id: '1',
      firstName: 'firstname2',
      lastName: null,
      organization: {
        id: null,
      },
    },
  },
]
