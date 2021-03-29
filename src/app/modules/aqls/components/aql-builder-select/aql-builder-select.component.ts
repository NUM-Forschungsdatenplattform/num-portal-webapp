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
