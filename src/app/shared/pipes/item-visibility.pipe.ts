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

@Pipe({
  name: 'itemVisibility',
})
export class ItemVisibilityPipe<T extends IItemVisibility> implements PipeTransform {
  private status: string
  private isOwner: boolean

  private checkVisibility = (item: T) => {
    return item.hiddenWhen
      ? !item.hiddenWhen.some((statusToHide) => statusToHide === this.status)
      : true
  }

  private checkDisabled = (acc: T[], item: T) => {
    const disabledByStatus = !item.disabledUnless.some(
      (activeStatus) => activeStatus === this.status
    )
    const disabledByOwnership = item.disableUnlessOwned ? !this.isOwner : false
    item.isDisabled = disabledByStatus || disabledByOwnership
    acc.push(item)
    return acc
  }

  transform(items: T[], status: string, ownerId: string, userId: string): T[] {
    this.status = status
    this.isOwner = ownerId !== undefined && ownerId !== null && ownerId === userId
    return items.filter(this.checkVisibility).reduce(this.checkDisabled, [] as T[])
  }
}
