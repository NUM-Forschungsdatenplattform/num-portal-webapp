import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IFilterItem } from '../../models/filter-chip.interface'

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent {
  constructor() {}
  @Input() filterChips: IFilterItem<string | number>[]
  @Input() multiSelect: boolean
  @Output() selectionChange = new EventEmitter()

  handleClickOnChip($event: any): void {
    if (!this.multiSelect) {
      this.filterChips.forEach((filter) => (filter.isSelected = false))
    }
    $event.isSelected = !$event.isSelected
    this.selectionChange.emit(this.filterChips)
  }
}
