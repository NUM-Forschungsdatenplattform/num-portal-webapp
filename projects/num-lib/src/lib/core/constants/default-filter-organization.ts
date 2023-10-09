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

import { OrganizationUserFilterChipId } from "../../shared/models/organization/organization-filter-chip.enum";
import { IOrganizationFilter } from "../../shared/models/organization/organization-filter.interface";


export const DEFAULT_ORGANIZATION_FILTER: IOrganizationFilter = {
  filterItem: [
    {
      id: OrganizationUserFilterChipId.OrganizationAll,
      title: 'ORGANIZATION_MANAGEMENT.ALL',
      isSelected: true,
    },
    {
      id: OrganizationUserFilterChipId.OrganizationActive,
      title: 'ORGANIZATION_MANAGEMENT.ACTIVE',
      isSelected: false,
    },
    {
      id: OrganizationUserFilterChipId.OrganizationInactive,
      title: 'ORGANIZATION_MANAGEMENT.INACTIVE',
      isSelected: false,
    },
  ],
}
