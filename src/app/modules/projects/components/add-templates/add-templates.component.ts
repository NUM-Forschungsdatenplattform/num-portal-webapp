import { Component, Input } from '@angular/core'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { ADD_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-add-templates',
  templateUrl: './add-templates.component.html',
  styleUrls: ['./add-templates.component.scss'],
})
export class AddTemplatesComponent {
  constructor(
    private dialogService: DialogService,
    private cohortService: CohortService,
    private toastMessageService: ToastMessageService
  ) {}

  @Input() isDisabled: boolean

  @Input() project: ProjectUiModel

  hitCounter: IDictionary<string, number> = {}
  isHitCounterLoading: boolean

  addTemplate(): void {
    const dialogContentPayload = this.project.templates
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IProjectTemplateInfoApi[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.project.templates = confirmResult
      }
    })
  }

  deleteTemplate(index: number): void {
    this.project.templates.splice(index, 1)
  }

  determineHits(): void {
    this.isHitCounterLoading = true
    this.hitCounter = {}
    const { cohortGroup } = this.project.convertToApiInterface()
    const templateIds = this.project.templates.map((template) => template.templateId)
    this.cohortService.getSizeForTemplates(cohortGroup, templateIds).subscribe(
      (result) => {
        this.isHitCounterLoading = false
        this.hitCounter = result
      },
      (_) => {
        this.isHitCounterLoading = false
        this.toastMessageService.openToast({
          type: ToastMessageType.Error,
          message: 'PROJECT.HITS.MESSAGE_ERROR_MESSAGE',
        })
      }
    )
  }
}
