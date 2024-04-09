import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'

export default interface INavItem {
  routeTo?: string
  icon?: string | string[]
  translationKey: string
  tabNav?: INavItem[]
  id?: string
  roles?: AvailableRoles[]
  disabled?: boolean
  isExternal?: boolean
  highlighted?: boolean
}
