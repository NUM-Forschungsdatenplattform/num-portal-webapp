import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { take } from 'rxjs/operators'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss'],
})
export class PhenotypeTableComponent implements OnInit, AfterViewInit, OnDestroy {
  filterConfig: IPhenotypeFilter
  displayedColumns: string[] = ['id', 'name', 'author', 'description']
  dataSource = new MatTableDataSource()
  private subscriptions = new Subscription()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

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

  ngOnInit(): void {
    this.subscriptions.add(
      this.phenotypeService.phenotypesObservable$.subscribe((phenotypes) =>
        this.handleData(phenotypes)
      )
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
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
