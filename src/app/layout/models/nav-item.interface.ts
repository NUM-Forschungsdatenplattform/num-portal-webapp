export default interface INavItem {
  routeTo: string
  icon?: string | string[]
  translationKey: string
  tabNav?: INavItem[]
  id?: string
  roles?: string[]
  disabled?: boolean
}
