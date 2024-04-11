import { AqlFilterChipId } from 'src/app/shared/models/aql/aql-filter-chip.enum'
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
