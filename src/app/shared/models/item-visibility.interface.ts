export interface IItemVisibility {
  id: string
  disabledUnless: string[]
  isDisabled?: boolean
  hiddenWhen?: string[]
  translationKey?: string
}
