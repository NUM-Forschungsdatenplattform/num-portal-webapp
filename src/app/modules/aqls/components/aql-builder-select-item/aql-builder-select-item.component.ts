import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AqbSelectItemUiModel } from '../../models/aqb/aqb-select-item-ui.model'

@Component({
  selector: 'num-aql-builder-select-item',
  templateUrl: './aql-builder-select-item.component.html',
  styleUrls: ['./aql-builder-select-item.component.scss'],
})
export class AqlBuilderSelectItemComponent implements OnInit {
  constructor() {}

  @Input()
  item: AqbSelectItemUiModel

  @Output()
  deleteItem = new EventEmitter()

  ngOnInit(): void {}

  deleteSelf(): void {
    this.deleteItem.emit()
  }
}
