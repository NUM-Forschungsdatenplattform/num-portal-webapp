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
