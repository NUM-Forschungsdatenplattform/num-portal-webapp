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
