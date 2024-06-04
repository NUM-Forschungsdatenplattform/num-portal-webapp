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
