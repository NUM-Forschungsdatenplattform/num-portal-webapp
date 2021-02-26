import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

@Component({
  selector: 'num-phenotype-editor-connector-aql',
  templateUrl: './phenotype-editor-connector-aql.component.html',
  styleUrls: ['./phenotype-editor-connector-aql.component.scss'],
})
export class PhenotypeEditorConnectorAqlComponent implements OnInit {
  @Input() phenotypeAql: AqlUiModel
  @Output() configureAql = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.configureAql.emit()
  }
}
