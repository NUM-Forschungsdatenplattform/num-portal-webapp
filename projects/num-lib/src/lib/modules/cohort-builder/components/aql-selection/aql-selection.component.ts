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
import { groupBy } from 'lodash-es'
import { combineLatest, Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { INFO_DIALOG_CONFIG } from './constants'
import { AqlCategoryService } from '../../../../core/services/aql-category/aql-category.service'
import { AqlService } from '../../../../core/services/aql/aql.service'
import { CohortBuilderService } from '../../../../core/services/cohort-builder/cohort-builder.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { compareLocaleStringValues } from '../../../../core/utils/sort.utils'
import { AqlUiModel } from '../../../../shared/models/aql/aql-ui.model'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { IAqlCategoryApi } from '../../../../shared/models/aql/category/aql-category.interface'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { IDictionary } from '../../../../shared/models/dictionary.interface'

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
    private dialogService: DialogService
  ) {}

  currentLang = 'en'
  groupedAqls: Observable<
    {
      de: string
      en: string
      categoryId: number
      aqls: IAqlApi[]
    }[]
  >

  initialCategories: IDictionary<number, IDictionary<string, string>>
  noResults = false

  ngOnInit(): void {
    this.initialCategories = {
      0: {
        en: 'QUERY_CATEGORIES.UNCATEGORIZED',
        de: 'QUERY_CATEGORIES.UNCATEGORIZED',
      },
    }

    // this.subscriptions.add(
    //   this.translateService.onLangChange.subscribe((event) => {
    //     this.currentLang = event.lang || 'en'
    //     this.initialCategories[0][event.lang] = this.translateService.instant(
    //       'QUERY_CATEGORIES.UNCATEGORIZED'
    //     )
    //     this.groupAndSortAql()
    //   })
    // )

    this.subscriptions.add(
      this.aqlCategoryService.getAll().subscribe(() => {
        this.subscriptions.add(
          this.aqlService.getAll().subscribe(() => {
            this.groupAndSortAql()
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  reduceCategories(
    aqlCategories: IAqlCategoryApi[]
  ): IDictionary<number, IDictionary<string, string>> {
    return aqlCategories.reduce((acc, category) => {
      acc[category.id] = {
        de: category.name.de,
        en: category.name.en,
      }
      return acc
    }, this.initialCategories)
  }

  groupAndSortAql(): void {
    this.groupedAqls = combineLatest([
      this.aqlService.filteredAqlsObservable$,
      this.aqlCategoryService.aqlCategoriesObservable$,
    ]).pipe(
      tap(([aqls]) => (this.noResults = aqls.length <= 0)),
      map(([aqls, categories]) => {
        const nameField = this.currentLang === 'de' ? 'name' : 'nameTranslated'
        aqls.sort((a, b) => compareLocaleStringValues(a[nameField], b[nameField], a.id, b.id, true))
        const aqlCategories = this.reduceCategories(categories)
        return Object.entries(groupBy(aqls, (item) => item.categoryId || 0))
          .sort(([keyA, _valueA], [keyB, _valueB]) => {
            // If no category is specified or the category is no longer existend we default to 0
            const categoryKeyA = aqlCategories[+keyA] ? +keyA : 0
            const categoryKeyB = aqlCategories[+keyB] ? +keyB : 0
            return compareLocaleStringValues(
              aqlCategories[categoryKeyA][this.currentLang],
              aqlCategories[categoryKeyB][this.currentLang],
              categoryKeyA,
              categoryKeyB,
              true
            )
          })
          .map(([key, value]) => {
            // If no category is specified or the category is no longer existend we default to 0
            const categoryKey = aqlCategories[+key] ? +key : 0
            return {
              de: aqlCategories[categoryKey].de,
              en: aqlCategories[categoryKey].en,
              categoryId: categoryKey,
              aqls: value,
            }
          })
      })
    )
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
