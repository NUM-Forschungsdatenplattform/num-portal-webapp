import { AvailableRoles } from './available-roles.enum'

export interface IItemVisibility {
  id: string
  disabledUnless: string[]
  disableUnlessOwned?: boolean
  forceEnableByRole?: AvailableRoles[]
  isDisabled?: boolean
  hiddenWhen?: string[]
  translationKey?: string
}
