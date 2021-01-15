import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AqbContainsItemUiModel } from '../../models/aqb/aqb-contains-item-ui.model'

@Component({
  selector: 'num-aql-builder-contains-item',
  templateUrl: './aql-builder-contains-item.component.html',
  styleUrls: ['./aql-builder-contains-item.component.scss'],
})
export class AqlBuilderContainsItemComponent implements OnInit {
  constructor() {}

  @Input()
  item: AqbContainsItemUiModel

  @Output()
  deleteItem = new EventEmitter<string>()

  ngOnInit(): void {}

  deleteSelf(): void {
    this.deleteItem.emit(this.item.archetypeId)
  }
}
