import { AqlFilterChipId } from 'src/app/shared/models/aql/aql-filter-chip.enum'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'

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
          id: AqlFilterChipId.OrganisationAql,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'firstname4 lastName4',
    },
    resultLength: 0,
  },
]
