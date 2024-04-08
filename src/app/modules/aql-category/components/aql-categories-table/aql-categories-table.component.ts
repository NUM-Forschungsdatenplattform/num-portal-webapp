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
import { Subscription } from 'rxjs'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { AqlCategoryTableColumn } from 'src/app/shared/models/aql/category/aql-category-table.interface'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { AqlCategoryMenuKeys, MENU_ITEM_DELETE, MENU_ITEM_EDIT } from './menu-item'
import { DELETE_AQL_CATEGORY_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { Sort } from '@angular/material/sort'

@Component({
  selector: 'num-aql-categories-table',
  templateUrl: './aql-categories-table.component.html',
  styleUrls: ['./aql-categories-table.component.scss'],
})
export class AqlCategoriesTableComponent
  extends SortableTable<IAqlCategoryApi>
  implements OnDestroy, OnInit
{
  @Output() openEditDialog = new EventEmitter<Omit<IAqlCategoryApi, 'id'>>()
  displayedColumns: AqlCategoryTableColumn[] = ['menu', 'nameDe', 'nameEn']
  menuItems: IItemVisibility[] = [MENU_ITEM_EDIT, MENU_ITEM_DELETE]

  private subscriptions = new Subscription()

  public sortBy: string
  public sortDir: string

  public pageIndex: number

  public totalItems: number

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  constructor(
    private aqlCategoryService: AqlCategoryService,
    private dialogService: DialogService,
    private toast: ToastMessageService
  ) {
    super()
  }

  ngOnInit() {
    this.pageIndex = 0
    this.sortBy = 'name-en'
    this.sortDir = 'ASC'
    this.getAll()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getAll() {
    this.subscriptions.add(
      this.aqlCategoryService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()

    if (this.sortBy === 'nameEn') {
      this.sortBy = 'name-en'
    }

    if (this.sortBy === 'nameDe') {
      this.sortBy = 'name-de'
    }

    this.getAll()
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  handleMenuClick(key: string, aqlCategory: IAqlCategoryApi): void {
    switch (key) {
      case AqlCategoryMenuKeys.Edit:
        this.openEditDialog.emit(aqlCategory)
        break
      case AqlCategoryMenuKeys.Delete:
        this.handleWithDialog(DELETE_AQL_CATEGORY_DIALOG_CONFIG, aqlCategory.id)
        break
    }
  }

  private handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe(async (confirmResult) => {
      if (confirmResult === true) {
        await this.delete(id)
      }
    })
  }

  handleData(projects: any): void {
    this.dataSource.data = projects.content
    this.totalItems = projects.totalElements
  }

  async delete(id: number): Promise<void> {
    try {
      await this.aqlCategoryService.delete(id).toPromise()

      this.getAll()

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'QUERY_CATEGORIES.DELETE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'QUERY_CATEGORIES.DELETE_ERROR_MESSAGE',
      })
    }
  }
}
