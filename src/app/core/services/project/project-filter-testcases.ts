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

import { ProjectFilterChipId } from 'src/app/shared/models/project/project-filter-chip.enum'
import { IProjectFilter } from 'src/app/shared/models/project/project-filter.interface'

export const projectFilterTestcases: { filter: IProjectFilter; resultLength: number }[] = [
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.Archived,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.AllProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 2,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.MyProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [
        {
          id: ProjectFilterChipId.OrganizationProjects,
          isSelected: true,
          title: '',
        },
      ],
      searchText: '',
    },
    resultLength: 0,
  },
]
