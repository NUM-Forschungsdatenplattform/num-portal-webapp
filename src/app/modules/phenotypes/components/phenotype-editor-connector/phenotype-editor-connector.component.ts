import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determineHits.interface'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'

@Component({
  selector: 'num-phenotype-editor-connector',
  templateUrl: './phenotype-editor-connector.component.html',
  styleUrls: ['./phenotype-editor-connector.component.scss'],
})
export class PhenotypeEditorConnectorComponent implements OnInit {
  @Input() phenotypeQuery: PhenotypeGroupUiModel
  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
