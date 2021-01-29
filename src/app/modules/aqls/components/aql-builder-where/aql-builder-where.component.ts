import { Component, Input, OnInit } from '@angular/core'
import { AqbSelectDestination } from '../../models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-where',
  templateUrl: './aql-builder-where.component.html',
  styleUrls: ['./aql-builder-where.component.scss'],
})
export class AqlBuilderWhereComponent implements OnInit {
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  ngOnInit(): void {}

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Where
  }
}
