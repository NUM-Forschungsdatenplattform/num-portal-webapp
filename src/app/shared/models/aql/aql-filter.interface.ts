import { AqlFilterChipId } from 'src/app/shared/models/aql/aql-filter-chip.enum'
import { IFilterChip } from 'src/app/shared/models/filter-chip.interface'

export interface IAqlFilter {
  searchText: string
  filterChips: IFilterChip<AqlFilterChipId>[]
}
