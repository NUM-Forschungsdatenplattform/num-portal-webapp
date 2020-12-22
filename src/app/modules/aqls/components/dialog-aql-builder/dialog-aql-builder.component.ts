import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

@Component({
  selector: 'num-dialog-aql-builder',
  templateUrl: './dialog-aql-builder.component.html',
  styleUrls: ['./dialog-aql-builder.component.scss'],
})
export class DialogAqlBuilderComponent implements OnInit, OnDestroy, IGenericDialog<any> {
  constructor(private aqlEditorService: AqlEditorService) {}

  dialogInput: any
  subscriptions = new Subscription()
  templates: IEhrbaseTemplate[]
  selectedTemplates = new FormControl()

  @Output() closeDialog = new EventEmitter()

  ngOnInit(): void {
    this.aqlEditorService.getTemplates().subscribe()
    this.subscriptions.add(
      this.aqlEditorService.templatesObservable$.subscribe((templates) =>
        this.handleTemplates(templates)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleTemplates(templates: IEhrbaseTemplate[]): void {
    this.templates = templates
  }

  handleItemSelect(item: { item: IContainmentTreeNode; compositionId: string }): void {
    console.log(item)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.dialogInput)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
