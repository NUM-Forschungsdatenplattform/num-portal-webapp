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
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'

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

  hasParameterError: boolean

  constructor(private aqlParameterService: AqlParameterService) {}

  ngOnInit(): void {
    if (this.aql.hasParameterError) {
      this.hasParameterError = true
    } else {
      this.aql.parameters.forEach((parameter) => {
        this.aqlParameterService.getValues(parameter.path, parameter.archetypeId).subscribe(
          (response) => {
            parameter.options = response.options
            const optionKeys = Object.keys(parameter.options)
            if (optionKeys.length) {
              parameter.valueType = AqlParameterValueType.Options
            } else {
              parameter.valueType = this.getValueTypeForParameter(response.type)
            }

            if (parameter.value === null || parameter.value === undefined) {
              switch (parameter.valueType) {
                case AqlParameterValueType.Boolean:
                  parameter.value = true
                  break
                case AqlParameterValueType.Options:
                  parameter.value = optionKeys[0]
                  break
                case AqlParameterValueType.Date:
                case AqlParameterValueType.DateTime:
                case AqlParameterValueType.Time:
                  parameter.value = new Date()
                  break
              }
            }

            this.checkParameterStatus()
            parameter.isMetaFetched = true
          },
          (_) => {
            this.hasParameterError = true
          }
        )
      })
    }
  }

  getValueTypeForParameter(rmType: ReferenceModelType): AqlParameterValueType {
    switch (rmType) {
      case ReferenceModelType.Boolean:
      case ReferenceModelType.Dv_boolean:
        return AqlParameterValueType.Boolean
      case ReferenceModelType.Double:
      case ReferenceModelType.Dv_quantity:
        return AqlParameterValueType.Double
      case ReferenceModelType.Integer:
      case ReferenceModelType.Integer64:
      case ReferenceModelType.Long:
        return AqlParameterValueType.Number
      case ReferenceModelType.Dv_date:
        return AqlParameterValueType.Date
      case ReferenceModelType.Dv_date_time:
        return AqlParameterValueType.DateTime
      case ReferenceModelType.Dv_time:
        return AqlParameterValueType.Time

      default:
        return AqlParameterValueType.String
    }
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }

  checkParameterStatus(): void {
    // Timeout is here to get into the next rendering cycle and not to confuse the change detection
    setTimeout(() => {
      this.aql.checkParameterStatus()
    }, 0)
  }
}
