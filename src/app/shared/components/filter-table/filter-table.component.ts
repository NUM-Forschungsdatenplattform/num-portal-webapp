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
