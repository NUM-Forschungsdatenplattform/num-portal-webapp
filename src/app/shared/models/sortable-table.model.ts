import { Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

export abstract class SortableTable<T> {
  dataSource = new MatTableDataSource<T>()
  handleSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.dataSource.sort.active = 'id'
      this.dataSource.sort.direction = 'desc'
    } else {
      this.dataSource.sort.active = sort.active
      this.dataSource.sort.direction = sort.direction
    }
  }
}
