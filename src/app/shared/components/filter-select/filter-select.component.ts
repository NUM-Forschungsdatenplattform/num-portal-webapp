import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IFilterItem } from '../../models/filter-chip.interface'

@Component({
  selector: 'num-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
})
export class FilterSelectComponent implements OnInit {
  @Input() filterItem: IFilterItem<string | number>[]
  @Input() selectedItem: string
  @Output() selectionChange = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  handleFilterChange($event: any): void {
    const selectedValue = $event
    const filterItems = this.filterItem.filter((filterItem) => filterItem.id === selectedValue)
    this.selectionChange.emit(filterItems)
  }
}
