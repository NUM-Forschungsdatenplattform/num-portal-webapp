import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'

@Component({
  selector: 'num-study-editor-connector-phenotype',
  templateUrl: './project-editor-connector-phenotype.component.html',
  styleUrls: ['./project-editor-connector-phenotype.component.scss'],
})
export class ProjectEditorConnectorPhenotypeComponent implements OnInit {
  @Input() phenotype: PhenotypeUiModel
  @Input() isDisabled: boolean
  @Output() configurePhenotype = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.configurePhenotype.emit()
  }
}
