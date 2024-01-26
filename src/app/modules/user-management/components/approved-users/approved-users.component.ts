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
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { ApprovedUsersTableComponent } from '../approved-users-table/approved-users-table.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.scss'],
})
export class ApprovedUsersComponent implements OnInit, OnDestroy {
  @ViewChild(ApprovedUsersTableComponent) table: ApprovedUsersTableComponent

  filterConfig: IUserFilter

  private subscriptions = new Subscription()

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.setLastFilter()
  }

  setLastFilter(): void {
    this.subscriptions.add(
      this.adminService.filterConfigObservable$.pipe(take(1)).subscribe((config) => {
        this.filterConfig = config
        setTimeout(() => {
          this.table.initSearchAndFilters(
            //this.filterConfig.filterItem[0].isSelected,
            this.filterConfig,
            this.filterConfig.searchText
          )
        })
      })
    )
  }

  handleFilterChange(): void {
    let selectedTab = null

    for (let i = 0; i < this.filterConfig.filterItem.length; i++) {
      if (this.filterConfig.filterItem[i].isSelected) {
        selectedTab = this.filterConfig.filterItem[i].id
      }
    }

    this.table.handleFilterChange(this.filterConfig.filterItem[0].isSelected, selectedTab)
  }

  handleSearchChange(): void {
    this.table.handleSearchChange(this.filterConfig.searchText)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
