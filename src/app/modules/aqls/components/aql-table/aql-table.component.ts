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

import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { take } from 'rxjs/operators'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { Subscription } from 'rxjs'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { IItemVisibility } from '../../../../shared/models/item-visibility.interface'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { Router } from '@angular/router'
import { AqlMenuKeys, MENU_ITEM_CLONE, MENU_ITEM_DELETE, MENU_ITEM_EDIT } from './menu-item'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { AqlTableColumns } from 'src/app/shared/models/aql/aql-table.interface'
import { compareLocaleStringValues } from 'src/app/core/utils/sort.utils'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { TranslateService } from '@ngx-translate/core'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { IAqlCategoryIdNameMap } from 'src/app/shared/models/aql/category/aql-category-id-name-map.interface'

@Component({
  selector: 'num-aql-table',
  templateUrl: './aql-table.component.html',
  styleUrls: ['./aql-table.component.scss'],
})
export class AqlTableComponent extends SortableTable<IAqlApi> implements AfterViewInit, OnDestroy {
  user: IUserProfile
  displayedColumns: AqlTableColumns[] = [
    'menu',
    'name',
    'author',
    'creationDate',
    'isPublic',
    'organization',
    'category',
  ]
  lang = 'en'
  menuItems: IItemVisibility[] = [MENU_ITEM_CLONE, MENU_ITEM_EDIT, MENU_ITEM_DELETE]
  filterConfig: IAqlFilter
  selectedItem = 'QUERIES.ALL_AQLS'
  aqlCategories: IAqlCategoryIdNameMap = {}
  uncategorizedString = 'Uncategorized'
  private subscriptions = new Subscription()

  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  constructor(
    private aqlCategoryService: AqlCategoryService,
    private aqlService: AqlService,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private router: Router,
    private toast: ToastMessageService,
    private translateService: TranslateService
  ) {
    super()
    this.aqlService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))

    this.subscriptions.add(
      this.aqlService.filteredAqlsObservable$.subscribe((aqls) => this.handleData(aqls))
    )

    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
    )

    this.subscriptions.add(
      this.aqlCategoryService.aqlCategoriesObservable$.subscribe((aqlCategories) => {
        this.handleCategories(aqlCategories)
      })
    )

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.lang = event.lang || 'en'
        this.uncategorizedString = event.translations.QUERY_CATEGORIES.UNCATEGORIZED
      })
    )

    this.lang = this.translateService.currentLang || 'en'
    this.uncategorizedString = this.translateService.instant('QUERY_CATEGORIES.UNCATEGORIZED')
    this.aqlCategoryService.getAll().subscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

    this.dataSource.sortData = (data, matSort) => this.sortAqls(data, matSort)

    this.dataSource.sort = this.sort
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleData(aqls: IAqlApi[]): void {
    this.dataSource.data = aqls
  }

  private handleCategories(aqlCategories: IAqlCategoryApi[]): void {
    this.aqlCategories = aqlCategories.reduce((acc, category) => {
      acc[category.id] = {
        de: category.name.de,
        en: category.name.en,
      }
      return acc
    }, {})
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case AqlMenuKeys.Edit:
      case AqlMenuKeys.Clone:
        this.router.navigate(['aqls', id, 'editor'])
        break
      case AqlMenuKeys.Delete:
        this.handleWithDialog(DELETE_APPROVAL_DIALOG_CONFIG, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.delete(id).then(() => {
          this.aqlService.getAll().subscribe((aqls) => this.handleData(aqls))
        })
      }
    })
  }

  async delete(id: number): Promise<void> {
    try {
      await this.aqlService.delete(id).toPromise()

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'QUERIES.DELETE_QUERY_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'QUERIES.DELETE_QUERY_ERROR_MESSAGE',
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  sortAqls(data: IAqlApi[], sort: MatSort): IAqlApi[] {
    const isAsc = sort.direction === 'asc'
    const newData = [...data]

    switch (sort.active as AqlTableColumns) {
      case 'author': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(
            `${a.owner?.firstName || ''} ${a.owner?.lastName || ''}`,
            `${b.owner?.firstName || ''} ${b.owner?.lastName || ''}`,
            a.id,
            b.id,
            isAsc
          )
        )
      }
      case 'creationDate': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.createDate || '', b.createDate || '', a.id, b.id, isAsc)
        )
      }
      case 'name': {
        return newData.sort((a, b) => compareLocaleStringValues(a.name, b.name, a.id, b.id, isAsc))
      }
      case 'organization': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(
            a.owner?.organization?.name || '',
            b.owner?.organization?.name || '',
            a.id,
            b.id,
            isAsc
          )
        )
      }
      case 'category': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(
            !!a.categoryId ? this.aqlCategories[a.categoryId][this.lang] : this.uncategorizedString,
            !!b.categoryId ? this.aqlCategories[b.categoryId][this.lang] : this.uncategorizedString,
            a.id,
            b.id,
            isAsc
          )
        )
      }
      default: {
        return newData.sort((a, b) => {
          const compareResult = a.id - b.id
          return isAsc ? compareResult : compareResult * -1
        })
      }
    }
  }
}
