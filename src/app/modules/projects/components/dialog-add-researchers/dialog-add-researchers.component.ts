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

import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatTableDataSource } from '@angular/material/table'
import { cloneDeep } from 'lodash-es'
import { MatPaginator } from '@angular/material/paginator'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent
  implements OnInit, OnDestroy, AfterViewInit, IGenericDialog<IUser[]> {
  private subscriptions = new Subscription()

  dialogInput: IUser[]
  @Output() closeDialog = new EventEmitter<IUser[]>()

  dataSource = new MatTableDataSource<IUser>()

  selectedResearchers: IUser[] = []
  filterConfig: IUserFilter

  columnPaths = [['firstName'], ['lastName'], ['organization', 'name'], ['select']]
  columnKeys = ['firstName', 'lastName', 'info', 'isSelected']

  constructor(private adminService: AdminService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.setLastFilter()
    this.handleDilaogInput()

    this.adminService.getApprovedUsers().subscribe()
    this.subscriptions.add(
      this.adminService.filteredApprovedUsersObservable$.subscribe((users) => {
        this.handleUsersData(users)
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  setLastFilter(): void {
    this.adminService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  handleUsersData(users: IUser[]): void {
    this.dataSource.data = users.filter((user) => user.roles?.includes(AvailableRoles.Researcher))
  }

  handleDilaogInput(): void {
    this.selectedResearchers = cloneDeep(this.dialogInput)
  }

  handleSearchChange(): void {
    this.adminService.setFilter(this.filterConfig)
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.selectedResearchers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
