import { Component, OnInit } from '@angular/core'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'

@Component({
  selector: 'num-phenotypes',
  templateUrl: './phenotypes.component.html',
  styleUrls: ['./phenotypes.component.scss'],
})
export class PhenotypesComponent implements OnInit {
  constructor(private phenotypeService: PhenotypeService) {}

  ngOnInit(): void {
    this.phenotypeService.getAll().subscribe()
  }
}
