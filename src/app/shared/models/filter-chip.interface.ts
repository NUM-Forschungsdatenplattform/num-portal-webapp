export interface IFilterItem<T extends string | number> {
  id: T
  title: string
  isSelected: boolean
}
