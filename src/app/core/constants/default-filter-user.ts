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

import { UserFilterChipId } from 'src/app/shared/models/user/user-filter-chip.enum'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

export const DEFAULT_USER_FILTER: IUserFilter = {
  searchText: '',
  filterItem: [
    {
      id: UserFilterChipId.AllUser,
      title: 'FILTER_CHIP.ALL',
      isSelected: false,
    },
    {
      id: UserFilterChipId.OrganizationUser,
      title: 'FILTER_CHIP.ORGANIZATION',
      isSelected: false,
    },
    {
      id: UserFilterChipId.UserActive,
      title: 'USER_MANAGEMENT.ACTIVE',
      isSelected: true,
    },
    {
      id: UserFilterChipId.UserInactive,
      title: 'USER_MANAGEMENT.INACTIVE',
      isSelected: false,
    },
  ],
}
