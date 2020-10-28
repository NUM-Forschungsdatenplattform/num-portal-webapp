import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IPhenotype } from 'src/app/core/models/phenotype.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss'],
})
export class PhenotypeTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private phenotypeService: PhenotypeService) {}

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

  handleData(phenotypes: IPhenotype[]): void {
    this.dataSource.data = phenotypes
  }
}
