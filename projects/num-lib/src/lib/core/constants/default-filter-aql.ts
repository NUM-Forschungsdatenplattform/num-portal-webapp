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

import { AqlFilterChipId } from '../../shared/models/aql/aql-filter-chip.enum'
import { IAqlFilter } from '../../shared/models/aql/aql-filter.interface'

export const DEFAULT_AQL_FILTER: IAqlFilter = {
  searchText: '',
  filterItem: [
    {
      id: AqlFilterChipId.AllAql,
      title: 'FILTER_CHIP.ALL',
      isSelected: true,
    },
    {
      id: AqlFilterChipId.MyAql,
      title: 'FILTER_CHIP.MY_QUERIES',
      isSelected: false,
    },
    {
      id: AqlFilterChipId.OrganizationAql,
      title: 'FILTER_CHIP.ORGANIZATION',
      isSelected: false,
    },
  ],
}
