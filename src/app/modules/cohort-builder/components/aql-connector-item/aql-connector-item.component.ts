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
import { AqlParameterService } from 'src/app/core/services/aql-parameter/aql-parameter.service'
import { AqlParameterOperator } from 'src/app/shared/models/aql/aql-parameter-operator.type'
import { AqlParameterValueType } from 'src/app/shared/models/aql/aql-parameter-value-type.enum'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

@Component({
  selector: 'num-aql-connector-item',
  templateUrl: './aql-connector-item.component.html',
  styleUrls: ['./aql-connector-item.component.scss'],
})
export class AqlConnectorItemComponent implements OnInit {
  AqlParameterOperator = Object.keys(AqlParameterOperator)

  @Input() aql: AqlUiModel
  @Input() isDisabled: boolean
  @Output()
  deleteItem = new EventEmitter()

  constructor(private aqlParameterService: AqlParameterService) {}

  ngOnInit(): void {
    this.aql.parameters.forEach((parameter) => {
      this.aqlParameterService
        .getValues(parameter.path, parameter.archetypeId)
        .subscribe((response) => {
          console.log(`Options for Parameter ${parameter.name}: `, response.options)
          parameter.options = response.options
          // TODO: Take actual type
          parameter.valueType = AqlParameterValueType.String
        })
    })
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }

  checkParameterStatus(): void {
    this.aql.checkParameterStatus()
  }
}
