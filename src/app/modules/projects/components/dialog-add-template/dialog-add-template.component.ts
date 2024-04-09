import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ITemplateFilter } from '../../../../shared/models/template/template-filter.interface'
import { TemplateService } from '../../../../core/services/template/template.service'
import { take } from 'rxjs/operators'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'

@Component({
  selector: 'num-dialog-add-template',
  templateUrl: './dialog-add-template.component.html',
  styleUrls: ['./dialog-add-template.component.scss'],
})
export class DialogAddTemplateComponent implements OnInit {
  @Output() closeDialog = new EventEmitter()

  filterConfig: ITemplateFilter
  dialogInput: IProjectTemplateInfoApi[] = []

  constructor(private templateService: TemplateService) {
    this.templateService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.templateService.getAll().subscribe()
  }

  handleSearchChange(): void {
    this.templateService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
