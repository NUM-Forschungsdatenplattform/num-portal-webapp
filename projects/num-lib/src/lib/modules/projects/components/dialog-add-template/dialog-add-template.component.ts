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

import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ITemplateFilter } from '../../../../shared/models/template/template-filter.interface'
import { TemplateService } from '../../../../core/services/template/template.service'
import { take } from 'rxjs/operators'
import { IProjectTemplateInfoApi } from '../../../../shared/models/project/project-template-info-api.interface'

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
