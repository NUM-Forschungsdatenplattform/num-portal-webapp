import { IFilterItem } from '../filter-chip.interface'
import { UserFilterChipId } from './user-filter-chip.enum'

export interface IUserFilter {
  searchText: string
  filterItem: IFilterItem<UserFilterChipId>[]
}
