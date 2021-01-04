import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'
import { IAqbSelectClick } from '../../models/aqb/aqb-select-click.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-dialog-aql-builder',
  templateUrl: './dialog-aql-builder.component.html',
  styleUrls: ['./dialog-aql-builder.component.scss'],
})
export class DialogAqlBuilderComponent implements OnInit, OnDestroy, IGenericDialog<any> {
  constructor(private aqlEditorService: AqlEditorService) {}

  dialogInput: AqbUiModel
  subscriptions = new Subscription()
  templates: IEhrbaseTemplate[]
  selectedTemplates = new FormControl()

  compositions: AqbContainsCompositionUiModel[] = []

  @Output() closeDialog = new EventEmitter()

  ngOnInit(): void {
    this.aqlEditorService.getTemplates().subscribe()
    this.subscriptions.add(
      this.aqlEditorService.templatesObservable$.subscribe((templates) =>
        this.handleTemplates(templates)
      )
    )
    this.compositions = Array.from(this.dialogInput.contains.compositions.values())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleTemplates(templates: IEhrbaseTemplate[]): void {
    this.templates = templates
  }

  handleItemSelect(clickEvent: IAqbSelectClick): void {
    this.dialogInput.handleElementSelect(clickEvent)
    this.compositions = Array.from(this.dialogInput.contains.compositions.values())
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
