import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { take } from 'rxjs/operators'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { cloneDeep } from 'lodash-es'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'num-dialog-add-aqls',
  templateUrl: './dialog-add-aqls.component.html',
  styleUrls: ['./dialog-add-aqls.component.scss'],
})
export class DialogAddAqlsComponent implements OnInit, AfterViewInit, IGenericDialog<AqlUiModel[]> {
  private subscriptions = new Subscription()

  @ViewChild(MatPaginator) paginator: MatPaginator

  dialogInput: AqlUiModel[] = []
  @Output() closeDialog = new EventEmitter()

  dataSource = new MatTableDataSource<IAqlApi>()

  selectedAqls: (IAqlApi | AqlUiModel)[] = []
  filterConfig: IAqlFilter
  idOfHighlightedRow: number

  columnPaths = [['name'], ['select']]
  columnKeys = ['name', 'isSelected']

  preview: IDefinitionList[] = []

  constructor(private aqlService: AqlService) {}

  ngOnInit(): void {
    this.setLastFilter()
    this.handleDilaogInput()

    this.aqlService.getAll().subscribe()
    this.subscriptions.add(
      this.aqlService.filteredAqlsObservable$.subscribe((aqls) => {
        this.handleFilteredData(aqls)
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  setLastFilter(): void {
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  handleFilteredData(aqls: IAqlApi[]): void {
    if (aqls.length) {
      this.generatePreviewData(aqls[0])
    }
    this.dataSource.data = aqls
  }

  generatePreviewData(aql: IAqlApi): void {
    this.idOfHighlightedRow = aql.id
    this.preview = [
      { title: 'FORM.AUTHOR', description: aql.owner?.firstName + ' ' + aql.owner?.lastName },
      { title: 'FORM.PURPOSE', description: aql.purpose },
      { title: 'FORM.USE', description: aql.use },
    ]
  }

  handleDilaogInput(): void {
    this.selectedAqls = cloneDeep(this.dialogInput)
  }

  handlePreviewClick(row: IAqlApi): void {
    this.generatePreviewData(row)
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.selectedAqls = this.selectedAqls.map((aql) => {
      if (aql instanceof AqlUiModel) {
        return aql
      }
      return new AqlUiModel(aql)
    })
    this.closeDialog.emit(this.selectedAqls)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
