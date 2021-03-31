/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
