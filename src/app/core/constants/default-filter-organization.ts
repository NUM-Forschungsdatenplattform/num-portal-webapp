import { OrganizationUserFilterChipId } from 'src/app/shared/models/organization/organization-filter-chip.enum'
import { IOrganizationFilter } from 'src/app/shared/models/organization/organization-filter.interface'

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
