import { Component, Input } from '@angular/core'

import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FlexModule } from '@angular/flex-layout/flex'
import { AqlBuilderSelectItemComponent } from '../aql-builder-select-item/aql-builder-select-item.component'

@Component({
  selector: 'num-aql-builder-select',
  templateUrl: './aql-builder-select.component.html',
  styleUrls: ['./aql-builder-select.component.scss'],
  imports: [NgClass, ExtendedModule, FaIconComponent, FlexModule, AqlBuilderSelectItemComponent],
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
