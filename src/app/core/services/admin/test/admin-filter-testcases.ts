import { UserFilterChipId } from 'src/app/shared/models/user/user-filter-chip.enum'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

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
