import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { cloneDeep } from 'lodash-es'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-dialog-add-phenotypes',
  templateUrl: './dialog-add-phenotypes.component.html',
  styleUrls: ['./dialog-add-phenotypes.component.scss'],
})
export class DialogAddPhenotypesComponent
  implements OnInit, AfterViewInit, OnDestroy, IGenericDialog<PhenotypeUiModel[]> {
  dialogInput: PhenotypeUiModel[] = []

  dataSource = new MatTableDataSource<IPhenotypeApi>()

  selectedPhenotypes: (IPhenotypeApi | PhenotypeUiModel)[] = []
  filterConfig: IPhenotypeFilter
  idOfHighlightedRow: number

  columnPaths = [['name'], ['select']]
  columnKeys = ['name', 'isSelected']

  preview: IDefinitionList[] = []
  @Output() closeDialog = new EventEmitter()
  @ViewChild(MatPaginator) paginator: MatPaginator

  private subscriptions = new Subscription()

  constructor(private phenotypeService: PhenotypeService) {
    this.phenotypeService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.subscriptions.add(this.phenotypeService.getAll().subscribe())

    this.subscriptions.add(
      this.phenotypeService.filteredPhenotypesObservable$.subscribe((phenotypes) => {
        this.handleFilteredData(phenotypes)
      })
    )

    this.handleDilaogInput()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  handleFilteredData(phenotypes: IPhenotypeApi[]): void {
    this.generatePreviewData(phenotypes && phenotypes.length > 0 ? phenotypes[0] : null)
    this.dataSource.data = phenotypes
  }

  generatePreviewData(phenotype: IPhenotypeApi): void {
    this.idOfHighlightedRow = phenotype?.id || null
    this.preview = phenotype
      ? [
          {
            title: 'FORM.TITLE',
            description: phenotype.name,
          },
          {
            title: 'FORM.AUTHOR',
            description: phenotype.owner?.lastName
              ? phenotype.owner?.firstName + ' ' + phenotype.owner?.lastName
              : '-',
          },
          { title: 'FORM.DESCRIPTION', description: phenotype.description },
        ]
      : []
  }

  handleDilaogInput(): void {
    this.selectedPhenotypes = cloneDeep(this.dialogInput)
  }

  handlePreviewClick(phenotypeRow: PhenotypeUiModel): void {
    this.generatePreviewData(phenotypeRow)
  }

  handleSearchChange(): void {
    this.phenotypeService.setFilter(this.filterConfig)
  }

  handleDialogConfirmOld(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogConfirm(): void {
    this.selectedPhenotypes = this.selectedPhenotypes.map((phenotype) => {
      if (phenotype instanceof PhenotypeUiModel) {
        return phenotype
      }
      return new PhenotypeUiModel(phenotype)
    })
    this.closeDialog.emit(this.selectedPhenotypes)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
