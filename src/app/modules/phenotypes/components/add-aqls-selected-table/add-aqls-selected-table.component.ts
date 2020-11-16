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
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

@Component({
  selector: 'num-add-aqls-selected-table',
  templateUrl: './add-aqls-selected-table.component.html',
  styleUrls: ['./add-aqls-selected-table.component.scss'],
})
export class AddAqlsSelectedTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() selectedAqls: AqlUiModel[]
  @Output() selectedAqlsChange = new EventEmitter<AqlUiModel[]>()

  dataSource = new MatTableDataSource<AqlUiModel>()

  constructor() {}
  displayedColumns: string[] = ['name', 'author', 'organisation', 'icon']
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedAqls': {
            const changedData = changes[propName].currentValue as AqlUiModel[]
            this.dataSource.data = changedData
          }
        }
      }
    }
  }

  handleRowClick(row: AqlUiModel): void {
    const data = this.dataSource.data.filter((aql) => aql.id !== row.id)
    this.selectedAqlsChange.emit(data)
  }
}
