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
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { take } from 'rxjs/operators'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { MENU_ITEM_CLONE, MENU_ITEM_DELETE, PhenotypeMenuKeys } from './menu-item'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss'],
})
export class PhenotypeTableComponent implements AfterViewInit, OnDestroy {
  user: IUserProfile
  filterConfig: IPhenotypeFilter
  menuItems: IItemVisibility[] = [MENU_ITEM_CLONE, MENU_ITEM_DELETE]
  displayedColumns: string[] = ['menu', 'name', 'author', 'organisation']
  dataSource = new MatTableDataSource()
  private subscriptions = new Subscription()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  constructor(
    private phenotypeService: PhenotypeService,
    private router: Router,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private toastMessageService: ToastMessageService
  ) {
    this.phenotypeService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))

    this.subscriptions.add(
      this.phenotypeService.filteredPhenotypesObservable$.subscribe((phenotypes) =>
        this.handleData(phenotypes)
      )
    )

    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  handleData(phenotypes: IPhenotypeApi[]): void {
    this.dataSource.data = phenotypes
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case PhenotypeMenuKeys.Clone:
        this.router.navigate(['phenotypes', id, 'editor'])
        break
      case PhenotypeMenuKeys.Delete:
        this.handleWithDialog(DELETE_APPROVAL_DIALOG_CONFIG, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.delete(id).then(() => {
          this.subscriptions.add(
            this.phenotypeService.getAll().subscribe((phenotypes) => this.handleData(phenotypes))
          )
        })
      }
    })
  }

  async delete(id: number): Promise<void> {
    try {
      await this.phenotypeService.delete(id).toPromise()

      this.toastMessageService.openToast({
        type: ToastMessageType.Success,
        message: 'PHENOTYPE.DELETE_PHENOTYPE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.toastMessageService.openToast({
        type: ToastMessageType.Error,
        message: 'PHENOTYPE.DELETE_PHENOTYPE_ERROR_MESSAGE',
      })
    }
  }

  handleSearchChange(): void {
    this.phenotypeService.setFilter(this.filterConfig)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
