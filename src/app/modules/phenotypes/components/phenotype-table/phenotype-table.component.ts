import { Component, OnInit } from '@angular/core';
import { PhenotypeService } from 'src/app/core/services/phenotype.service';

@Component({
  selector: 'num-phenotype-table',
  templateUrl: './phenotype-table.component.html',
  styleUrls: ['./phenotype-table.component.scss']
})
export class PhenotypeTableComponent implements OnInit {

  constructor(private phenotypeService: PhenotypeService) { }

  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = this.phenotypeService.phenotypesObservable$;

  ngOnInit(): void {
  }

}
