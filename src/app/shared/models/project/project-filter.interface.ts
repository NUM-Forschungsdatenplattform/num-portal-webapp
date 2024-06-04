import { IFilterItem } from 'src/app/shared/models/filter-chip.interface'
import { ProjectFilterChipId } from './project-filter-chip.enum'

export interface IProjectFilter {
  searchText: string
  filterItem: IFilterItem<ProjectFilterChipId>[]
}
