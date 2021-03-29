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

@Pipe({
  name: 'aqlItemVisibility',
})
export class AqlItemVisibilityPipe<T extends IItemVisibility> implements PipeTransform {
  private aqlOwnerId: string
  private userId: string
  private isOwnAql: AqlOwner
  private checkVisibility = (item: T) => {
    return item.hiddenWhen
      ? !item.hiddenWhen.some((menuItemToHide) => menuItemToHide === this.isOwnAql)
      : true
  }

  private checkDisabled = (acc: T[], item: T) => {
    item.isDisabled = item.disabledUnless.some((activeMenuItem) => activeMenuItem === this.isOwnAql)
    acc.push(item)
    return acc
  }

  transform(items: T[], aqlOwnerId: string, userId: string): T[] {
    this.aqlOwnerId = aqlOwnerId
    this.userId = userId
    this.isOwnAql = this.aqlOwnerId === this.userId ? AqlOwner.MyAql : AqlOwner.OtherAql
    return items.filter(this.checkVisibility).reduce(this.checkDisabled, [] as T[])
  }
}
