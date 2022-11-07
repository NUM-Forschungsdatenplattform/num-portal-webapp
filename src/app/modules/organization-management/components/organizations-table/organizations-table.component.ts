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
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { OrganizationTableColumn } from '../../models/organization-table-column.interface'
import { Sort } from '@angular/material/sort'

@Component({
  selector: 'num-organizations-table',
  templateUrl: './organizations-table.component.html',
  styleUrls: ['./organizations-table.component.scss'],
})
export class OrganizationsTableComponent
  extends SortableTable<IOrganization>
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription()
  constructor(private organizationService: OrganizationService, private router: Router) {
    super()
  }

  displayedColumns: OrganizationTableColumn[] = ['icon', 'name', 'mailDomains']

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

  ngOnInit(): void {
    this.sortBy = 'name'
    this.sortDir = 'ASC'

    this.subscriptions.add(
      this.organizationService.organizationsObservable$.subscribe((data) => this.handleData(data))
    )
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  getAll() {
    this.subscriptions.add(
      this.organizationService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()
    this.getAll()
  }

  handleData(organizations: any): void {
    this.dataSource.data = organizations.content
    this.totalItems = organizations.totalElements
  }

  handleSelectClick(organization: IOrganization): void {
    this.router.navigate(['organizations', organization.id, 'editor'])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
