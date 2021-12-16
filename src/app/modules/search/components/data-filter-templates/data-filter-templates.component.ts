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
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ADD_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-data-filter-templates',
  templateUrl: './data-filter-templates.component.html',
  styleUrls: ['./data-filter-templates.component.scss'],
})
export class DataFilterTemplatesComponent {
  @Input()
  project: ProjectUiModel

  @Input()
  isHitCounterLoading: boolean

  @Input()
  hitCounter: IDictionary<string, number>

  @Input()
  totalCohortSize: number

  @Output()
  determineHits = new EventEmitter()

  constructor(private dialogService: DialogService) {}

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
}
