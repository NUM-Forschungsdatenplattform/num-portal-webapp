import { Component, Input, OnInit } from '@angular/core'
import { IPhenotypeQueryApi } from 'src/app/shared/models/phenotype/phenotype-query-api.interface'

@Component({
  selector: 'num-phenotype-editor-connector',
  templateUrl: './phenotype-editor-connector.component.html',
  styleUrls: ['./phenotype-editor-connector.component.scss'],
})
export class PhenotypeEditorConnectorComponent implements OnInit {
  @Input() phenotypeQuery: IPhenotypeQueryApi
  constructor() {}

  ngOnInit(): void {}
}
