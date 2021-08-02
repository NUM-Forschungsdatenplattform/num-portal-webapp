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
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { sortProjects } from 'src/app/core/utils/sort.utils'
import { DataExplorerProjectTableColumns } from 'src/app/shared/models/project/data-explorer-project-table.interface'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'

@Component({
  selector: 'num-data-explorer-projects-table',
  templateUrl: './data-explorer-projects-table.component.html',
  styleUrls: ['./data-explorer-projects-table.component.scss'],
})
export class DataExplorerProjectsTableComponent
  extends SortableTable<IProjectApi>
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscriptions = new Subscription()
  constructor(private projectService: ProjectService, private router: Router) {
    super()
  }

  displayedColumns: DataExplorerProjectTableColumns[] = [
    'icon',
    'name',
    'author',
    'organization',
    'createDate',
  ]
  dataSource = new MatTableDataSource()

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
      this.projectService.myPublishedProjectsObservable$.subscribe((projects) => {
        this.handleData(projects)
      })
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sortData = (data, matSort) => sortProjects(data, matSort)
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(projects: IProjectApi[]): void {
    this.dataSource.data = projects
  }

  handleSelectClick(id: number): void {
    this.router.navigate(['data-explorer/projects', id])
  }
}
