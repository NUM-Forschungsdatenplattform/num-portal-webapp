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
          id: AqlFilterChipId.OrganizationAql,
          isSelected: true,
          title: '',
        },
      ],
      searchText: 'firstname4 lastName4',
    },
    resultLength: 0,
  },
]
export const aqlFilterLanguageTestcases: {
  filter: IAqlFilter
  resultLength: number
  lang: string
}[] = [
  {
    filter: {
      filterItem: [],
      searchText: 'germanName1',
    },
    lang: 'de',
    resultLength: 1,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'germanName1',
    },
    lang: 'en',
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'englishName2',
    },
    lang: 'de',
    resultLength: 0,
  },
  {
    filter: {
      filterItem: [],
      searchText: 'englishName2',
    },
    lang: 'en',
    resultLength: 1,
  },
]
