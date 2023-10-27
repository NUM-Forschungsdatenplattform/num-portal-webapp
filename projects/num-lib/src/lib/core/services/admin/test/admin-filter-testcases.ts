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

import { UserFilterChipId } from "../../../../shared/models/user/user-filter-chip.enum";
import { IUserFilter } from "../../../../shared/models/user/user-filter.interface";


export const adminFilterTestcases: { filter: IUserFilter; resultLength: number }[] = [
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
      searchText: 'max',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'musterfrau',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: UserFilterChipId.OrganizationUser,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'max',
    },
    resultLength: 0,
  },
]
