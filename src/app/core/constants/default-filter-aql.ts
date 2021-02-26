import { AqlFilterChipId } from 'src/app/shared/models/aql/aql-filter-chip.enum'
import { IAqlFilter } from '../../shared/models/aql/aql-filter.interface'

export const DEFAULT_AQL_FILTER: IAqlFilter = {
  searchText: '',
  filterItem: [
    {
      id: AqlFilterChipId.AllAql,
      title: 'AQL.ALL_AQLS',
      isSelected: true,
    },
    {
      id: AqlFilterChipId.MyAql,
      title: 'AQL.MY_AQLS',
      isSelected: false,
    },
    {
      id: AqlFilterChipId.OrganisationAql,
      title: 'AQL.ORGANISATION_AQLS',
      isSelected: false,
    },
  ],
}
