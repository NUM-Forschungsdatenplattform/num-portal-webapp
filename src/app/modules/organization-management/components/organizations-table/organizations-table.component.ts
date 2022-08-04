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
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { compareIds, compareLocaleStringValues } from 'src/app/core/utils/sort.utils'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { OrganizationTableColumn } from '../../models/organization-table-column.interface'

@Component({
  selector: 'num-organizations-table',
  templateUrl: './organizations-table.component.html',
  styleUrls: ['./organizations-table.component.scss'],
})
export class OrganizationsTableComponent
  extends SortableTable<IOrganization>
  implements OnInit, OnDestroy, AfterViewInit
{
  private subscriptions = new Subscription()
  constructor(private organizationService: OrganizationService, private router: Router) {
    super()
  }

  displayedColumns: OrganizationTableColumn[] = ['icon', 'name', 'mailDomains']
  showPagination = false

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.organizationService.organizationsObservable$.subscribe((organizations) => {
        this.handleData(organizations)
        if (this.dataSource.data.length > 10) {
          this.showPagination = true
        }
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sortData = (data, sort) => this.sortOrganizations(data, sort)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(organizations: IOrganization[]): void {
    this.dataSource.data = organizations
  }

  handleSelectClick(organization: IOrganization): void {
    this.router.navigate(['organizations', organization.id, 'editor'])
  }

  sortOrganizations(data: IOrganization[], sort: MatSort): IOrganization[] {
    const isAsc = sort.direction === 'asc'
    const newData = [...data]

    switch (sort.active as OrganizationTableColumn) {
      case 'name': {
        return newData.sort((a, b) =>
          compareLocaleStringValues(a.name || '', b.name || '', a.id, b.id, isAsc)
        )
      }
      default: {
        return newData.sort((a, b) => compareIds(a.id, b.id, isAsc))
      }
    }
  }
}
