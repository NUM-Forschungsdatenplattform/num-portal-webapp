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
import { IUserProfile } from '../models/user/user-profile.interface'

@Pipe({
  name: 'phenotypeMenu',
})
export class PhenotypeMenuPipe<T extends IItemVisibility> implements PipeTransform {
  private isOwner: boolean
  private user: IUserProfile

  private checkDisabled = (acc: T[], item: T) => {
    const enabledByRole = item.forceEnableByRole
      ? item.forceEnableByRole.some((role) => this.user.roles?.includes(role))
      : false

    const disabledByOwnership = item.disableUnlessOwned ? !this.isOwner : false

    item.isDisabled = enabledByRole ? false : disabledByOwnership
    acc.push(item)
    return acc
  }

  transform(items: T[], ownerId: string, user: IUserProfile): T[] {
    this.user = user
    this.isOwner = ownerId !== undefined && ownerId !== null && ownerId === user?.id
    return items.reduce(this.checkDisabled, [] as T[])
  }
}
