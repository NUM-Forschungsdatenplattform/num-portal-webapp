import { Component, Input, OnInit } from '@angular/core'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-select',
  templateUrl: './aql-builder-select.component.html',
  styleUrls: ['./aql-builder-select.component.scss'],
})
export class AqlBuilderSelectComponent implements OnInit {
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  ngOnInit(): void {}
}
