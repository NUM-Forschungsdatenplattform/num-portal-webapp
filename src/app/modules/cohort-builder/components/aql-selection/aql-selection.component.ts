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

import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { groupBy } from 'lodash-es'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { CohortBuilderService } from 'src/app/core/services/cohort-builder/cohort-builder.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { INFO_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-aql-selection',
  templateUrl: './aql-selection.component.html',
  styleUrls: ['./aql-selection.component.scss'],
})
export class AqlSelectionComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(
    private cohortBuilderService: CohortBuilderService,
    private aqlService: AqlService,
    private aqlCategoryService: AqlCategoryService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  currentLang = this.translateService.currentLang || 'en'
  groupedAqls: Observable<IDictionary<number, IAqlApi[]>>
  aqlCategories: IDictionary<number, IDictionary<string, string>>
  initialCategories: IDictionary<number, IDictionary<string, string>>

  ngOnInit(): void {
    this.initialCategories = {
      0: {
        en: this.translateService.instant('AQL_CATEGORIES.UNCATEGORIZED'),
        de: this.translateService.instant('AQL_CATEGORIES.UNCATEGORIZED'),
      },
    }

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.currentLang = event.lang || 'en'
        this.aqlCategories[0][event.lang] = this.translateService.instant(
          'AQL_CATEGORIES.UNCATEGORIZED'
        )
      })
    )
    this.subscriptions.add(this.aqlCategoryService.getAll().subscribe())
    this.subscriptions.add(
      this.aqlCategoryService.aqlCategoriesObservable$.subscribe((aqlCategories) => {
        this.aqlCategories = aqlCategories.reduce((acc, category) => {
          acc[category.id] = {
            de: category.name.de,
            en: category.name.en,
          }
          return acc
        }, this.initialCategories)
      })
    )
    this.subscriptions.add(this.aqlService.getAll().subscribe())
    this.groupedAqls = this.aqlService.aqlsObservable$.pipe(
      map((aqls) => {
        return groupBy(aqls, (item) => item.categoryId || 0)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  emitAqlEvent(aqlApi: IAqlApi): void {
    const aqlUiModel = new AqlUiModel(aqlApi)
    this.cohortBuilderService.pushItemToTarget(aqlUiModel)
  }

  openAqlInfoDialog(aqlApi: IAqlApi): void {
    const dialogConfig: DialogConfig = {
      ...INFO_DIALOG_CONFIG,
      dialogContentPayload: new AqlUiModel(aqlApi),
    }

    this.dialogService.openDialog(dialogConfig)
  }
}
