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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { AqlParameterService } from 'src/app/core/services/aql-parameter/aql-parameter.service'
import { AqlParameterOperator } from 'src/app/shared/models/aql/aql-parameter-operator.type'
import { AqlParameterValueType } from 'src/app/shared/models/aql/aql-parameter-value-type.enum'
import { IAqlParameter } from 'src/app/shared/models/aql/aql-parameter.interface'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'

@Component({
  selector: 'num-aql-connector-item',
  templateUrl: './aql-connector-item.component.html',
  styleUrls: ['./aql-connector-item.component.scss'],
})
export class AqlConnectorItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input() aql: AqlUiModel
  @Input() isDisabled: boolean
  @Output()
  deleteItem = new EventEmitter()

  hasParameterError: boolean
  currentLang = this.translateService.currentLang || 'en'

  constructor(
    private aqlParameterService: AqlParameterService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions()
    if (this.aql.hasParameterError) {
      this.hasParameterError = true
    } else {
      this.aql.parameters.forEach((parameter) => {
        console.log('parameter', parameter)
        this.aqlParameterService.getValues(parameter.path, parameter.archetypeId).subscribe(
          (response) => {
            console.log('response', response)
            parameter.options = response.options
            const optionKeys = Object.keys(parameter.options)
            //  console.log('options', parameter.options)
            if (optionKeys.length) {
              parameter.valueType = AqlParameterValueType.Options
            } else {
              parameter.valueType = this.getValueTypeForParameter(response.type)
            }
            console.log('valueType', parameter.valueType)
            this.prefillParameter(parameter, optionKeys)
            this.setPossibleOperators(parameter, response.type)

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  initSubscriptions() {
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.currentLang = event.lang || 'en'
      })
    )
  }

  prefillParameter(parameter: IAqlParameter, optionKeys: string[]): void {
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
    } else if (
      parameter.valueType === AqlParameterValueType.Date ||
      parameter.valueType === AqlParameterValueType.DateTime
    ) {
      parameter.value = this.convertDateStringToDate(parameter.value as string)
    } else if (parameter.valueType === AqlParameterValueType.Time) {
      parameter.value = this.convertTimeStringToDate(parameter.value as string)
    }
  }

  setPossibleOperators(parameter: IAqlParameter, referenceModelType: ReferenceModelType): void {
    switch (parameter.valueType) {
      case AqlParameterValueType.Boolean:
      case AqlParameterValueType.String:
        parameter.possibleOperators = [AqlParameterOperator['='], AqlParameterOperator['!=']]
        break
      case AqlParameterValueType.Options:
        if (
          referenceModelType === ReferenceModelType.Dv_ordinal ||
          referenceModelType === ReferenceModelType.Dv_count ||
          referenceModelType === ReferenceModelType.Dv_duration
        ) {
          parameter.possibleOperators = Object.keys(AqlParameterOperator) as AqlParameterOperator[]
        } else {
          parameter.possibleOperators = [AqlParameterOperator['='], AqlParameterOperator['!=']]
        }
        break

      default:
        parameter.possibleOperators = Object.keys(AqlParameterOperator) as AqlParameterOperator[]
        break
    }
  }

  convertDateStringToDate(dateString: string): Date {
    try {
      const date = new Date(dateString)
      return date instanceof Date && !isNaN(date as any) ? date : new Date()
    } catch (error) {
      return new Date()
    }
  }

  convertTimeStringToDate(timeString: string): Date {
    try {
      const [hour, minute, second, ..._] = (timeString as string)
        .split(':')
        .map((part) => parseInt(part, 10))
      const date = new Date(2012, 11, 21, hour, minute, second)
      return date instanceof Date && !isNaN(date as any) ? date : new Date()
    } catch (error) {
      return new Date()
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

  onCheckboxChange(parameter: IAqlParameter): void {
    parameter.isDisabled = !parameter.isDisabled
    parameter
  }

  checkParameterStatus(): void {
    // Timeout is here to get into the next rendering cycle and not to confuse the change detection
    setTimeout(() => {
      this.aql.checkParameterStatus()
    }, 0)
  }
}
