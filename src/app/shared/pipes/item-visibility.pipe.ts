import { Pipe, PipeTransform } from '@angular/core'
import { IItemVisibility } from '../models/item-visibility.interface'

@Pipe({
  name: 'itemVisibility',
})
export class ItemVisibilityPipe<T extends IItemVisibility> implements PipeTransform {
  private status: string
  private checkVisibility = (item: T) => {
    return item.hiddenWhen
      ? !item.hiddenWhen.some((statusToHide) => statusToHide === this.status)
      : true
  }

  private checkDisabled = (acc: T[], item: T) => {
    item.isDisabled = !item.disabledUnless.some((activeStatus) => activeStatus === this.status)
    acc.push(item)
    return acc
  }

  transform(items: T[], status: string): T[] {
    this.status = status
    return items.filter(this.checkVisibility).reduce(this.checkDisabled, [] as T[])
  }
}
