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

import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

@Component({
  selector: 'num-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.scss'],
})
export class ApprovedUsersComponent implements OnInit {
  filterConfig: IUserFilter

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.setLastFilter()
    this.adminService.getApprovedUsers().subscribe()
  }

  setLastFilter(): void {
    this.adminService.filterConfigObservable$.pipe(take(1)).subscribe((config) => {
      this.filterConfig = config
    })
  }

  handleSearchChange(): void {
    this.adminService.setFilter(this.filterConfig)
  }
}
