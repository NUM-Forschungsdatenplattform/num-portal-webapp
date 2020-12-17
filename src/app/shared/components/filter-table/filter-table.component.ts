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
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IFilterTable } from '../../models/filter-table.interface'

@Component({
  selector: 'num-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items: IFilterTable[]
  @Output() selectedItemsChange = new EventEmitter<IFilterTable[]>()

  dataSource = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'info', 'select']

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.items
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleSelectClick(item: IFilterTable): void {
    item.isSelected = !item.isSelected
    this.selectedItemsChange.emit(this.items)
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'items': {
            const changedData = changes[propName].currentValue as IFilterTable[]
            this.dataSource.data = changedData
          }
        }
      }
    }
  }
}
