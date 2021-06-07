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
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { compareIds, compareLocaleStringValues } from 'src/app/core/utils/sort.utils'
import { AqlCategoryTableColumn } from 'src/app/shared/models/aql/category/aql-category-table.interface'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { AqlCategoryMenuKeys, MENU_ITEM_DELETE, MENU_ITEM_EDIT } from './menu-item'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'
import { Router } from '@angular/router'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

@Component({
  selector: 'num-aql-categories-table',
  templateUrl: './aql-categories-table.component.html',
  styleUrls: ['./aql-categories-table.component.scss'],
})
export class AqlCategoriesTableComponent
  extends SortableTable<IAqlCategoryApi>
  implements AfterViewInit, OnDestroy, OnInit {
  displayedColumns: AqlCategoryTableColumn[] = ['menu', 'nameDe', 'nameEn']
  menuItems: IItemVisibility[] = [MENU_ITEM_EDIT, MENU_ITEM_DELETE]

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
    private dialogService: DialogService,
    private router: Router,
    private toast: ToastMessageService
  ) {
    super()

    this.subscriptions.add(
      this.aqlCategoryService.aqlCategoriesObservable$.subscribe((aqlCategories) =>
        this.handleData(aqlCategories)
      )
    )
  }

  ngOnInit(): void {
    this.aqlCategoryService.getAll().subscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sortData = (data, sort) => this.sortAqlCategories(data, sort)
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case AqlCategoryMenuKeys.Edit:
        // TODO: Open dialog
        // this.router.navigate(['aqls', id, 'editor'])
        break
      case AqlCategoryMenuKeys.Delete:
        this.handleWithDialog(DELETE_APPROVAL_DIALOG_CONFIG, id)
        break
    }
  }

  private handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.delete(id).then(() => {
          this.aqlCategoryService.getAll().subscribe((aqls) => this.handleData(aqls))
        })
      }
    })
  }

  private handleData(aqlCategories: IAqlCategoryApi[]): void {
    this.dataSource.data = aqlCategories
  }

  private sortAqlCategories(data: IAqlCategoryApi[], sort: MatSort): IAqlCategoryApi[] {
    const isAsc = sort.direction === 'asc'
    const newData = [...data]

    switch (sort.active as AqlCategoryTableColumn) {
      case 'nameDe': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.name.de, b.name.de, a.id, b.id, isAsc)
        )
      }
      case 'nameEn': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.name.en, b.name.en, a.id, b.id, isAsc)
        )
      }
      default: {
        return newData.sort((a, b) => compareIds(a.id, b.id, isAsc))
      }
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.aqlCategoryService.delete(id).toPromise()

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'AQL_CATEGORIES.DELETE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'AQL_CATEGORIES.DELETE_ERROR_MESSAGE',
      })
    }
  }
}
