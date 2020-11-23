export default interface INavItem {
  routeTo: string
  icon?: string
  translationKey: string
  tabNav?: INavItem[]
  id?: string
  roles?: string[]
}
