import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IFilterItem } from '../../models/filter-chip.interface'

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  constructor() {}
  @Input() filterChips: IFilterItem<string | number>[]
  @Input() multiSelect: boolean
  @Output() selectionChange = new EventEmitter()

  ngOnInit(): void {}

  handleClickOnChip($event: any): void {
    if (!this.multiSelect) {
      this.filterChips.forEach((filter) => (filter.isSelected = false))
    }
    $event.isSelected = !$event.isSelected
    this.selectionChange.emit(this.filterChips)
  }
}
