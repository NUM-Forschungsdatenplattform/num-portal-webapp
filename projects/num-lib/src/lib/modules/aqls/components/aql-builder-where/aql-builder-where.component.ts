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

import { Component, Input } from '@angular/core'
import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { AqlBuilderDialogMode } from '../../../../shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'

@Component({
  selector: 'num-aql-builder-where',
  templateUrl: './aql-builder-where.component.html',
  styleUrls: ['./aql-builder-where.component.scss'],
})
export class AqlBuilderWhereComponent {
  AqbSelectDestination = AqbSelectDestination
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.AqlEditor

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Where
  }
}
