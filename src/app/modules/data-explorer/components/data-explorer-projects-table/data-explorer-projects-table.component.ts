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
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { sortProjects } from 'src/app/core/utils/sort.utils'
import { DataExplorerProjectTableColumns } from 'src/app/shared/models/project/data-explorer-project-table.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { take } from 'rxjs/operators'

@Component({
  selector: 'num-data-explorer-projects-table',
  templateUrl: './data-explorer-projects-table.component.html',
  styleUrls: ['./data-explorer-projects-table.component.scss'],
})
export class DataExplorerProjectsTableComponent
  extends SortableTable<IProjectApi>
  implements OnInit, OnDestroy
{
  private subscriptions = new Subscription()
  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {
    super()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns: DataExplorerProjectTableColumns[] = [
    'icon',
    'name',
    'author',
    'organization',
    'createDate',
  ]
  dataSource = new MatTableDataSource()

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

  ngOnInit(): void {
    this.pageIndex = 0
    this.filters = {
      status: 'PUBLISHED',
    }
    this.getAll(true)

    this.sortBy = 'name'
    this.sortDir = 'ASC'
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()
    this.getAll()
  }

  getAll(returnFirstIndex = false) {
    if (returnFirstIndex && typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }
    this.subscriptions.add(
      this.projectService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy, this.filters, 'en')
        .subscribe((data) => {
          this.handleData(data)
        }),
    )
  }

  goToFirstPage() {
    this.paginator.firstPage()
    this.pageIndex = 0
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(projects: any): void {
    this.dataSource.data = projects.content
    this.totalItems = projects.totalElements
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  handleSelectClick(id: number): void {
    this.router.navigate(['data-explorer/projects', id])
  }
}
