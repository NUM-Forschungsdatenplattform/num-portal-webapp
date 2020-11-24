import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-study-editor-connector-phenotype',
  templateUrl: './study-editor-connector-phenotype.component.html',
  styleUrls: ['./study-editor-connector-phenotype.component.scss'],
})
export class StudyEditorConnectorPhenotypeComponent implements OnInit {
  @Input() phenotype: PhenotypeUiModel
  @Output() configurePhenotype = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.configurePhenotype.emit()
  }
}
