export interface IItemVisibility {
  id: string
  disabledUnless: string[]
  disableUnlessOwned?: boolean
  isDisabled?: boolean
  hiddenWhen?: string[]
  translationKey?: string
}
