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

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { take } from 'rxjs/operators'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { Subscription } from 'rxjs'
import { MatSort, Sort } from '@angular/material/sort'
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
export class AqlTableComponent extends SortableTable<IAqlApi> implements OnDestroy, OnInit {
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
  filterConfig: any
  selectedItem = 'QUERIES.ALL_AQLS'
  aqlCategories: IAqlCategoryIdNameMap = {}
  uncategorizedString = 'Uncategorized'
  private subscriptions = new Subscription()

  public sortBy: string
  public sortDir: string

  public pageIndex: number

  public totalItems: number

  public filters: any

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
      this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
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

  ngOnInit() {
    this.pageIndex = 0
    this.filters = {
      type: null,
      search: null,
    }

    this.sortBy = 'name'
    this.sortDir = 'ASC'

    this.getAll()
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()
    this.getAll()
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  getAll() {
    this.subscriptions.add(
      this.aqlService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy, this.filters)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleSearchChange(): void {
    if (this.filterConfig.searchText === '') {
      this.filters.search = null
    } else {
      this.filters.search = this.filterConfig.searchText
    }
    this.getAll()
  }

  getCategory() {}

  handleData(projects: any): void {
    this.dataSource.data = projects.content
    this.totalItems = projects.totalElements
  }

  handleChangeFilter(): void {
    for (let i = 0; i < this.filterConfig.filterItem.length; i++) {
      if (this.filterConfig.filterItem[i].isSelected) {
        switch (this.filterConfig.filterItem[i].id) {
          case 'QUERIES.ALL_AQLS':
            this.filters.type = null
            break
          case 'QUERIES.MY_AQL':
            this.filters.type = 'OWNED'
            break
          case 'QUERIES.ORGANIZATION_AQLS':
            this.filters.type = 'ORGANIZATION'
            break
          default:
        }
      }
    }
    this.getAll()
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
          this.aqlService.getAll().subscribe()
        })
      }
    })
  }

  async delete(id: number): Promise<void> {
    try {
      await this.aqlService.delete(id).toPromise()

      this.getAll()

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
}
