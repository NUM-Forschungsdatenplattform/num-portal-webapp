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

import { PhenotypeFilterChipId } from 'src/app/shared/models/phenotype/phenotype-filter-chip.enum'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'

export const phenotypeFilterTestcases: { filter: IPhenotypeFilter; resultLength: number }[] = [
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
      searchText: 'itemName1',
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
          id: PhenotypeFilterChipId.MyPhenotype,
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
          id: PhenotypeFilterChipId.OrganizationPhenotype,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'firstname4 lastName4',
    },
    resultLength: 0,
  },
]
