import { Component, Input } from '@angular/core'

import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-select',
  templateUrl: './aql-builder-select.component.html',
  styleUrls: ['./aql-builder-select.component.scss'],
})
export class AqlBuilderSelectComponent {
  AqbSelectDestination = AqbSelectDestination
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  deleteItem(index: number): void {
    this.aqbModel.select.splice(index, 1)
  }

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Select
  }
}
