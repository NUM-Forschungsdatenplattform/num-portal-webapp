import { AqlFilterId } from 'src/app/shared/models/aql/aql-filter-chip.enum'
import { IAqlFilter } from '../../shared/models/aql/aql-filter.interface'

export const DEFAULT_AQL_FILTER: IAqlFilter = {
  searchText: '',
  filterChips: [
    {
      id: AqlFilterId.MyAql,
      title: 'AQL.MY_AQLS',
      isSelected: true,
    },
    {
      id: AqlFilterId.OrganisationAql,
      title: 'AQL.ORGANISATION_AQLS',
      isSelected: true,
    },
    {
      id: AqlFilterId.AllAql,
      title: 'AQL.ALL_AQLS',
      isSelected: false,
    },
  ],
}
