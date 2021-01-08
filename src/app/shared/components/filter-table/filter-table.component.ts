import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'num-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent<T> implements OnInit, OnChanges, AfterViewInit {
  @Input() dataSource: MatTableDataSource<any>
  @Input() identifierName: string
  @Input() columnKeys: string[]
  @Input() columnPaths: string[][]
  @Input() selectedItems: T[]
  @Output() selectedItemsChange = new EventEmitter<T[]>()

  lookupSelectedItems = new Map<string | number, boolean>()

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor() {}

  ngOnInit(): void {
    this.selectedItems.forEach((selectedItem) => {
      const identifier = selectedItem[this.identifierName]
      this.lookupSelectedItems.set(identifier, true)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleSelectClick(row: any): void {
    this.selectedItemsChange.emit([...this.selectedItems, row])
  }

  handleDeselectClick(row: any): void {
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
