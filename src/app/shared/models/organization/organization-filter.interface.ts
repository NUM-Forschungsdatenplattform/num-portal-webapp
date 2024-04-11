import { IFilterItem } from '../filter-chip.interface'
import { OrganizationUserFilterChipId } from './organization-filter-chip.enum'

export interface IOrganizationFilter {
  filterItem: IFilterItem<OrganizationUserFilterChipId>[]
}
