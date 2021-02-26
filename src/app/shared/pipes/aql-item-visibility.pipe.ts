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
