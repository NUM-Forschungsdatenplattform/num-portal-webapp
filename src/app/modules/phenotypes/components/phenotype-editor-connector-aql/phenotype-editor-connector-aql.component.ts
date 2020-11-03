import { Component, Input, OnInit } from '@angular/core'
import { IPhenotypeQuery } from '../../models/phenotype-query.interface'

@Component({
  selector: 'num-phenotype-editor-connector-aql',
  templateUrl: './phenotype-editor-connector-aql.component.html',
  styleUrls: ['./phenotype-editor-connector-aql.component.scss'],
})
export class PhenotypeEditorConnectorAqlComponent implements OnInit {
  @Input() phenotypeQuery: IPhenotypeQuery
  constructor() {}

  ngOnInit(): void {}
}
