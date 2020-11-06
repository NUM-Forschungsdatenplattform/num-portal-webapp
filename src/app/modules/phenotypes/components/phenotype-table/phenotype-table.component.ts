import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss'],
})
export class PhenotypeTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private phenotypeService: PhenotypeService, private router: Router) {}

  displayedColumns: string[] = ['id', 'name', 'description']
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(phenotypes: IPhenotypeApi[]): void {
    this.dataSource.data = phenotypes
  }

  handleRowClick(phenotype: IPhenotypeApi): void {
    this.router.navigate(['phenotypes', phenotype.id, 'editor'])
  }
}
