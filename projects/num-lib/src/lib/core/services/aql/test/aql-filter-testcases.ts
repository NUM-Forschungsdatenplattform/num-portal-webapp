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

import { AqlFilterChipId } from "projects/num-lib/src/lib/shared/models/aql/aql-filter-chip.enum";
import { IAqlFilter } from "projects/num-lib/src/lib/shared/models/aql/aql-filter.interface";


export const aqlFilterTestcases: { filter: IAqlFilter; resultLength: number }[] = [
  {
    filter: {
      filterItem: [],
      searchText: 'test',
    },
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'aqlName1',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'firstname2',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: AqlFilterChipId.MyAql,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'firstname4 lastName4',
    },
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [
        {
          id: AqlFilterChipId.OrganizationAql,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'firstname4 lastName4',
    },
    resultLength: 0,
  },
]
export const aqlFilterLanguageTestcases: {
  filter: IAqlFilter
  resultLength: number
  lang: string
}[] = [
  {
    filter: {
      filterItem: [],
      searchText: 'germanName1',
    },
    lang: 'de',
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'germanName1',
    },
    lang: 'en',
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'englishName2',
    },
    lang: 'de',
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'englishName2',
    },
    lang: 'en',
    resultLength: 1,
  },
]
