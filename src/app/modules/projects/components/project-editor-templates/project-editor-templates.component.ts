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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'

@Component({
  selector: 'num-project-editor-templates',
  templateUrl: './project-editor-templates.component.html',
  styleUrls: ['./project-editor-templates.component.scss'],
})
export class ProjectEditorTemplatesComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  templatesValue: IProjectTemplateInfoApi[] = []
  @Output() templatesChange = new EventEmitter<IProjectTemplateInfoApi[]>()
  @Input() isDisabled: boolean
  @Input()
  get templates(): IProjectTemplateInfoApi[] {
    return this.templatesValue
  }
  set templates(templates: IProjectTemplateInfoApi[]) {
    this.templatesValue = templates
    this.templatesChange.emit(templates)
  }

  ngOnInit(): void {}

  addTemplate(): void {
    const dialogContentPayload = this.templates
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IProjectTemplateInfoApi | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.templates = confirmResult
      }
    })
  }
}
