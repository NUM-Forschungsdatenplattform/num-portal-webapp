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

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'num-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent<T> implements OnInit, OnChanges {
  @Input() dataSource: MatTableDataSource<any>
  @Input() identifierName: string
  @Input() columnKeys: string[]
  @Input() columnPaths: string[][]
  @Input() selectedItems: T[]
  @Input() idOfHighlightedRow: string | number
  @Output() selectedItemsChange = new EventEmitter<T[]>()
  @Output() rowClick = new EventEmitter<T>()

  lookupSelectedItems = new Map<string | number, boolean>()

  constructor() {}

  ngOnInit(): void {
    this.selectedItems.forEach((selectedItem) => {
      const identifier = selectedItem[this.identifierName]
      this.lookupSelectedItems.set(identifier, true)
    })
  }

  handleSelectClick(event: Event, row: any): void {
    event.stopPropagation()
    this.selectedItemsChange.emit([...this.selectedItems, row])
  }

  handleRowClick(row: any): void {
    this.rowClick.emit(row)
  }

  handleDeselectClick(event: Event, row: any): void {
    event.stopPropagation()
    const identifier = row[this.identifierName]
    const result = this.selectedItems.filter(
      (selectedItem) => selectedItem[this.identifierName] !== identifier
    )
    this.selectedItemsChange.emit(result)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedItems': {
            const changedData = changes[propName].currentValue as T[]
            const selectedItems = new Map<string | number, boolean>()
            changedData.forEach((selectedItem) => {
              const identifier = selectedItem[this.identifierName]
              selectedItems.set(identifier, true)
            })
            this.lookupSelectedItems = selectedItems
          }
        }
      }
    }
  }
}
