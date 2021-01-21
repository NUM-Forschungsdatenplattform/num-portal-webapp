import { AqlFilterEnum } from 'src/app/shared/models/aql/aql-filter-chip.enum'
import { IFilterItem } from 'src/app/shared/models/filter-chip.interface'

export interface IAqlFilter {
  searchText: string
  filterItem: IFilterItem<AqlFilterEnum>[]
}
