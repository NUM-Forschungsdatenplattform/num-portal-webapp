/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input } from '@angular/core'
import { ADD_DIALOG_CONFIG } from './constants'
import { CohortService } from '../../../../core/services/cohort/cohort.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { IDictionary } from '../../../../shared/models/dictionary.interface'
import { IProjectTemplateInfoApi } from '../../../../shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from '../../../../shared/models/project/project-ui.model'
import { ToastMessageType } from '../../../../shared/models/toast-message-type.enum'

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
