import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { take } from 'rxjs/operators'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { AqlService } from 'src/app/core/services/aql.service'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-add-aqls',
  templateUrl: './dialog-add-aqls.component.html',
  styleUrls: ['./dialog-add-aqls.component.scss'],
})
export class DialogAddAqlsComponent implements OnInit, IGenericDialog<AqlUiModel[]> {
  @Output() closeDialog = new EventEmitter()

  filterConfig: IAqlFilter
  dialogInput: AqlUiModel[] = []

  constructor(private aqlService: AqlService) {
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.aqlService.getAll().subscribe()
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
