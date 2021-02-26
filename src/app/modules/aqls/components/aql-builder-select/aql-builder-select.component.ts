import { Component, Input, OnInit } from '@angular/core'

import { AqbSelectDestination } from '../../models/aqb/aqb-select-destination.enum'
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

  deleteItem(index: number): void {
    this.aqbModel.select.splice(index, 1)
  }

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Select
  }
}
