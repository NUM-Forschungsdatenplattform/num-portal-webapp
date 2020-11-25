import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-add-phenotypes-filter-table',
  templateUrl: './add-phenotypes-filter-table.component.html',
  styleUrls: ['./add-phenotypes-filter-table.component.scss'],
})
export class AddPhenotypesFilterTableComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions = new Subscription()

  @Input() selectedPhenotypes: PhenotypeUiModel[]
  @Output() selectedPhenotypesChange = new EventEmitter<PhenotypeUiModel[]>()
  @Output() phenotypePreview = new EventEmitter<PhenotypeUiModel>()

  constructor(private phenotypeService: PhenotypeService) {}
  idOfHighlightedRow: number
  dataSource = new MatTableDataSource<IPhenotypeApi>()
  displayedColumns: string[] = ['name', 'icon']
  lookupSelectedPhenotypes: { [id: number]: boolean } = {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.phenotypeService.filteredPhenotypesObservable$.subscribe((phenotypes) =>
        this.handleData(phenotypes)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selectedPhenotypes': {
            const changedData = changes[propName].currentValue as PhenotypeUiModel[]
            const selectedPhenotypes: { [id: number]: boolean } = {}
            changedData.forEach(
              (selectedPhenotype) => (selectedPhenotypes[selectedPhenotype.id] = true)
            )
            this.lookupSelectedPhenotypes = selectedPhenotypes
          }
        }
      }
    }
  }

  handleData(phenotypes: IPhenotypeApi[]): void {
    this.dataSource.data = phenotypes
    if (phenotypes.length) {
      this.handleRowClick(phenotypes[0])
    }
  }

  handleSelectClick(row: IPhenotypeApi): void {
    this.lookupSelectedPhenotypes[row.id] = true
    this.selectedPhenotypesChange.emit([...this.selectedPhenotypes, new PhenotypeUiModel(row)])
  }

  handleDeselectClick(row: IPhenotypeApi): void {
    const newSelection = this.selectedPhenotypes.filter(
      (selectedPhenotype) => selectedPhenotype.id !== row.id
    )
    this.lookupSelectedPhenotypes[row.id] = false
    this.selectedPhenotypesChange.emit(newSelection)
  }

  handleRowClick(row: IPhenotypeApi): void {
    this.idOfHighlightedRow = row.id
    this.phenotypePreview.emit(new PhenotypeUiModel(row))
  }
}
