/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Pipe, PipeTransform } from '@angular/core'
import { IItemVisibility } from '../models/item-visibility.interface'
import { AqlOwner } from '../../modules/aqls/components/aql-table/menu-item'
import { IUserProfile } from '../models/user/user-profile.interface'

@Pipe({
  name: 'aqlMenu',
})
/**
 * This pipe generates the action menu items for the rows in the aql table
 * by hiding and disabling specific elements based on the ItemVisibility interface
 */
export class AqlMenuPipe<T extends IItemVisibility> implements PipeTransform {
  private user: IUserProfile
  private isOwnAql: AqlOwner

  /**
   * Checks if the menu item is visible based on the ownership of the item
   * @param item menu item to be checked
   * @returns true if the item is visible
   */
  private checkVisibility = (item: T) => {
    return item.hiddenWhen
      ? !item.hiddenWhen.some((menuItemToHide) => menuItemToHide === this.isOwnAql)
      : true
  }

  /**
   * Checks each menu item if it should be disabled or not based on role or ownership
   * @param acc result
   * @param item item
   * @returns the items after checking each for the need to disable
   */
  private checkDisabled = (acc: T[], item: T) => {
    /** Checks if the disabling based on the ownership should be overwritten by a given role */
    const enabledByRole = item.forceEnableByRole
      ? item.forceEnableByRole.some((role) => this.user.roles?.includes(role))
      : false

    /** Checks if the item should be disabled based on the ownership */
    const disabledByOwnership = item.disabledUnless.some(
      (activeMenuItem) => activeMenuItem === this.isOwnAql
    )

    item.isDisabled = enabledByRole ? false : disabledByOwnership
    acc.push(item)
    return acc
  }

  transform(items: T[], ownerId: string, user: IUserProfile): T[] {
    this.user = user
    this.isOwnAql = ownerId === user.id ? AqlOwner.MyAql : AqlOwner.OtherAql
    return items.filter(this.checkVisibility).reduce(this.checkDisabled, [] as T[])
  }
}
