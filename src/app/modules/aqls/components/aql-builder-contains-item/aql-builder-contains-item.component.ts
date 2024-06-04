import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AqbContainsItemUiModel } from '../../../../shared/models/aqb/aqb-contains-item-ui.model'

@Component({
  selector: 'num-aql-builder-contains-item',
  templateUrl: './aql-builder-contains-item.component.html',
  styleUrls: ['./aql-builder-contains-item.component.scss'],
})
export class AqlBuilderContainsItemComponent {
  constructor() {}

  @Input()
  item: AqbContainsItemUiModel

  @Output()
  deleteItemByArchetypeReferenceId = new EventEmitter<number>()

  deleteSelf(): void {
    this.deleteItemByArchetypeReferenceId.emit(this.item.archetypeReferenceId)
  }
}
