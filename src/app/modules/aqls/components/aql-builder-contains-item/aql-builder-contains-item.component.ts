import { Component, Input, OnInit } from '@angular/core'
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

  ngOnInit(): void {}

  deleteSelf(): void {
    console.log('TODO: Item should be deleted in the group')
  }
}
