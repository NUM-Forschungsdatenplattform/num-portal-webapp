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

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { cloneDeep } from 'lodash-es'
import { Subscription } from 'rxjs'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'

@Component({
  selector: 'num-dialog-aql-info',
  templateUrl: './dialog-aql-info.component.html',
  styleUrls: ['./dialog-aql-info.component.scss'],
})
export class DialogAqlInfoComponent implements OnInit, OnDestroy, IGenericDialog<AqlUiModel> {
  private readonly OPERATOR_SUFFIX = '__OPERATOR'
  private readonly NAME_SUFFIX = '__NAME'
  private subscriptions = new Subscription()

  currentLang = this.translateService.currentLang || 'en'
  dialogInput: AqlUiModel
  aql: AqlUiModel
  queryHighlighted: string
  @Output() closeDialog = new EventEmitter()
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.aql = cloneDeep(this.dialogInput)
    this.queryHighlighted = this.highlightQueryString(this.aql.queryWithOperatorPlaceholder)
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.currentLang = event.lang || 'en'
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  highlightQueryString(aqlQuery: string): string {
    let resultString = aqlQuery
    this.aql.parameters.forEach((param) => {
      resultString = resultString.replace(
        '$' + param.name + this.NAME_SUFFIX,
        `<span class="mark--name">$${param.name}</span>`
      )
      resultString = resultString.replace(
        '$' + param.name + this.OPERATOR_SUFFIX,
        `<span class="mark--operator">${param.operator}</span>`
      )
    })
    return resultString
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }
}
