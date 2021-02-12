import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'
import { IAqbSelectClick } from '../../models/aqb/aqb-select-click.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { cloneDeep } from 'lodash-es'
import { AqbSelectDestination } from '../../models/aqb/aqb-select-destination.enum'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { COMPILE_ERROR_CONFIG } from './constants'

@Component({
  selector: 'num-dialog-aql-builder',
  templateUrl: './dialog-aql-builder.component.html',
  styleUrls: ['./dialog-aql-builder.component.scss'],
})
export class DialogAqlBuilderComponent
  implements OnInit, OnDestroy, IGenericDialog<IAqlBuilderDialogInput> {
  AqbSelectDestination = AqbSelectDestination
  constructor(
    private aqlEditorService: AqlEditorService,
    private toastMessageService: ToastMessageService
  ) {}

  dialogInput: IAqlBuilderDialogInput

  aqbModel: AqbUiModel

  subscriptions = new Subscription()
  templates: string[]
  selectedTemplates: FormControl

  compositions: AqbContainsCompositionUiModel[] = []

  @Output() closeDialog = new EventEmitter()

  ngOnInit(): void {
    this.aqbModel = cloneDeep(this.dialogInput.model)
    this.selectedTemplates = new FormControl(this.dialogInput.selectedTemplateIds)

    if (this.dialogInput.allowedTemplates) {
      this.handleTemplates(this.dialogInput.allowedTemplates)
    } else {
      this.aqlEditorService.getTemplates().subscribe()
      this.subscriptions.add(
        this.aqlEditorService.templatesObservable$.subscribe((templates) => {
          const templateIds = templates.map((template) => template.templateId)
          this.handleTemplates(templateIds)
        })
      )
    }

    this.compositions = Array.from(this.aqbModel.contains.compositions.values())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleTemplates(templates: string[]): void {
    this.templates = templates
  }

  handleItemSelect(clickEvent: IAqbSelectClick): void {
    this.aqbModel.handleElementSelect(clickEvent)
    this.compositions = Array.from(this.aqbModel.contains.compositions.values())
  }

  async handleDialogConfirm(): Promise<void> {
    const aqbApiModel = this.aqbModel.convertToApi()
    try {
      const result = await this.aqlEditorService.buildAql(aqbApiModel).toPromise()
      const dialogReturn: IAqlBuilderDialogOutput = {
        model: this.aqbModel,
        selectedTemplateIds: this.selectedTemplates.value,
        result,
      }
      this.closeDialog.emit(dialogReturn)
    } catch (error) {
      this.toastMessageService.openToast(COMPILE_ERROR_CONFIG)
    }
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
