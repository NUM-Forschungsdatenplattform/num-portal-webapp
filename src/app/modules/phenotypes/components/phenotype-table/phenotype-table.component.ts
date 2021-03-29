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

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss'],
})
export class PhenotypeTableComponent implements AfterViewInit, OnDestroy {
  filterConfig: IPhenotypeFilter
  displayedColumns: string[] = ['name', 'author', 'organisation']
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

  constructor(private phenotypeService: PhenotypeService, private router: Router) {
    this.phenotypeService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))

    this.subscriptions.add(
      this.phenotypeService.filteredPhenotypesObservable$.subscribe((phenotypes) =>
        this.handleData(phenotypes)
      )
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  handleData(phenotypes: IPhenotypeApi[]): void {
    this.dataSource.data = phenotypes
  }

  handleRowClick(phenotype: IPhenotypeApi): void {
    this.router.navigate(['phenotypes', phenotype.id, 'editor'])
  }

  handleSearchChange(): void {
    this.phenotypeService.setFilter(this.filterConfig)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
