import { Component, Input, OnInit } from '@angular/core'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'

@Component({
  selector: 'num-phenotype-editor-connector',
  templateUrl: './phenotype-editor-connector.component.html',
  styleUrls: ['./phenotype-editor-connector.component.scss'],
})
export class PhenotypeEditorConnectorComponent implements OnInit {
  @Input() phenotypeQuery: PhenotypeGroupUiModel
  constructor() {}

  ngOnInit(): void {}
}
