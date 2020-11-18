export interface IFilterChip<T extends string | number> {
  id: T
  title: string
  isSelected: boolean
}
