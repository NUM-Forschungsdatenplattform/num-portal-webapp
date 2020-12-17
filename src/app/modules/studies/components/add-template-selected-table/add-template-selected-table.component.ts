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
import { IStudyTemplateInfoApi } from 'src/app/shared/models/study/study-template-info-api.interface'

@Component({
  selector: 'num-add-template-selected-table',
  templateUrl: './add-template-selected-table.component.html',
  styleUrls: ['./add-template-selected-table.component.scss'],
})
export class AddTemplateSelectedTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() selectedTemplates: IStudyTemplateInfoApi[]
  @Output() selectedTemplatesChange = new EventEmitter<IStudyTemplateInfoApi[]>()

  dataSource = new MatTableDataSource<IStudyTemplateInfoApi>()
  hasData = false

  constructor() {}
  displayedColumns: string[] = ['name', 'icon']
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.selectedTemplates || []
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedTemplates': {
            const changedData = changes[propName].currentValue as IStudyTemplateInfoApi[]
            this.hasData = changedData?.length > 0 ? true : false
            this.dataSource.data = changedData
          }
        }
      }
    }
  }

  handleRowClick(row: IStudyTemplateInfoApi): void {
    const data = this.dataSource.data.filter((template) => template.id !== row.id)
    this.selectedTemplatesChange.emit(data)
  }
}
