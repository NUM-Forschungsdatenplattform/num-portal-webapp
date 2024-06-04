import { Pipe, PipeTransform } from '@angular/core'
import { IItemVisibility } from '../models/item-visibility.interface'
import { IUserProfile } from '../models/user/user-profile.interface'

@Pipe({
  name: 'projectMenu',
})
/**
 * This pipe generates the action menu items for the rows in the projects table
 * by hiding and disabling specific elements based on the ItemVisibility interface
 */
export class ProjectMenuPipe<T extends IItemVisibility> implements PipeTransform {
  private status: string
  private user: IUserProfile
  private isOwner: boolean

  /**
   * Checks if the menu item is visible based on the status of the project
   * @param item menu item to be checked
   * @returns true if the item is visible
   */
  private checkVisibility = (item: T) => {
    return item.hiddenWhen
      ? !item.hiddenWhen.some((statusToHide) => statusToHide === this.status)
      : true
  }

  /**
   * Checks each menu item if it should be disabled or not based on role, status or ownership
   * @param acc result
   * @param item item
   * @returns the items after checking each for the need to disable
   */
  private checkDisabled = (acc: T[], item: T) => {
    /** Checks if the disabling based on the ownership should be overwritten by a given role */
    const enabledByRole = item.forceEnableByRole
      ? item.forceEnableByRole.some((role) => this.user.roles?.includes(role))
      : false

    /** Checks if the item should be disabled based on the status of the project.
     * This is not overwritten by the role
     */
    const disabledByStatus = !item.disabledUnless.some(
      (activeStatus) => activeStatus === this.status
    )

    /** Checks if the item should be disabled based on the ownership */
    const disabledByOwnership = item.disableUnlessOwned ? !this.isOwner : false

    item.isDisabled = disabledByStatus ? true : enabledByRole ? false : disabledByOwnership

    acc.push(item)
    return acc
  }

  transform(items: T[], status: string, ownerId: string, user: IUserProfile): T[] {
    this.status = status
    this.user = user
    this.isOwner = ownerId !== undefined && ownerId !== null && ownerId === user.id
    return items.filter(this.checkVisibility).reduce(this.checkDisabled, [] as T[])
  }
}
