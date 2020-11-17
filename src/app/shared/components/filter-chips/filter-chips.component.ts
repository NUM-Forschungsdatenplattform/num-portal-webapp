import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IFilterChip } from '../../models/filter-chip.interface'

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  constructor() {}
  @Input() filterChips: IFilterChip<string | number>[]
  @Output() selectionChange = new EventEmitter()

  ngOnInit(): void {}

  handleClickOnChip($event: any): void {
    $event.isSelected = !$event.isSelected
    this.selectionChange.emit(this.filterChips)
  }
}
