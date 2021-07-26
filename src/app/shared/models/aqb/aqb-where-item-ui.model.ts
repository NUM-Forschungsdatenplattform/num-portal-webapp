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

import { IAqbComparisonOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator-node.interface'
import { AqbComparisonOperator } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator.enum'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { IAqbParameterNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-parameter-node.interface'
import { IAqbSelectFieldNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-field-node.interface'
import { IAqbSimpleValueNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-simple-value-node.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IContainmentTreeNode } from '../../../modules/aqls/models/containment-tree-node.interface'
import {
  COMPARISON_OPERATOR_OPTIONS_EQUALS,
  COMPARISON_OPERATOR_OPTIONS_INEQUALS,
} from './aqb-comparison-operator-options'
import { IComparisonOperatorOption } from './aqb-comparison-operator-options.interface'
import { AqlParameterValueType } from '../aql/aql-parameter-value-type.enum'
import { IdHelperService } from 'src/app/core/helper/id-helper.service'
import { convertParameterInputToType } from 'src/app/core/utils/value-converter.utils'

export class AqbWhereItemUiModel {
  readonly type = ConnectorNodeType.Aqb_Item
  name: string
  givenName: string
  rmType: ReferenceModelType
  aqlPath: string
  humanReadablePath: string
  compositionReferenceId: number
  archetypeReferenceId: number

  comparisonOperator: AqbComparisonOperator
  comparisonOperatorOptions: IComparisonOperatorOption[]

  value: string | number | Date | boolean
  valueType: AqlParameterValueType

  isParameterType: boolean
  parameterTypeOptions = [
    { value: true, text: 'FORM.YES' },
    { value: false, text: 'FORM.NO' },
  ]

  parameterName = ''

  constructor(
    item: IContainmentTreeNode,
    compositionReferenceId: number,
    archetypeReferenceId: number
  ) {
    this.name = item.name || item.archetypeId
    this.givenName = item.name || item.archetypeId
    this.rmType = item.rmType
    this.aqlPath = this.configurePath(item.aqlPath || '')
    this.humanReadablePath = item.humanReadablePath
    this.compositionReferenceId = compositionReferenceId
    this.archetypeReferenceId = archetypeReferenceId

    this.comparisonOperator = AqbComparisonOperator.Eq

    this.isParameterType = false
    this.configureOptions()
    this.configureInput()
  }

  private configurePath(aqlPath: string): string {
    return aqlPath.endsWith('defining_code') ? aqlPath + '/code_string' : aqlPath
  }

  configureOptions(): void {
    switch (this.rmType) {
      case ReferenceModelType.Dv_quantity:
      case ReferenceModelType.Double:
      case ReferenceModelType.Integer:
      case ReferenceModelType.Integer64:
      case ReferenceModelType.Long:
      case ReferenceModelType.Dv_date:
      case ReferenceModelType.Dv_date_time:
      case ReferenceModelType.Dv_time:
        this.comparisonOperatorOptions = [
          ...COMPARISON_OPERATOR_OPTIONS_EQUALS,
          ...COMPARISON_OPERATOR_OPTIONS_INEQUALS,
        ]
        break

      default:
        this.comparisonOperatorOptions = COMPARISON_OPERATOR_OPTIONS_EQUALS
        break
    }
  }

  configureInput(): void {
    switch (this.rmType) {
      case ReferenceModelType.Boolean:
      case ReferenceModelType.Dv_boolean:
        this.valueType = AqlParameterValueType.Boolean
        this.value = true
        break
      case ReferenceModelType.Double:
      case ReferenceModelType.Dv_quantity:
        this.valueType = AqlParameterValueType.Double
        this.value = 1.1
        break
      case ReferenceModelType.Integer:
      case ReferenceModelType.Integer64:
      case ReferenceModelType.Long:
        this.valueType = AqlParameterValueType.Number
        this.value = 0
        break
      case ReferenceModelType.Dv_date:
        this.valueType = AqlParameterValueType.Date
        this.value = new Date()
        break
      case ReferenceModelType.Dv_date_time:
        this.valueType = AqlParameterValueType.DateTime
        this.value = new Date()
        break
      case ReferenceModelType.Dv_time:
        this.valueType = AqlParameterValueType.Time
        this.value = new Date()
        break

      default:
        this.valueType = AqlParameterValueType.String
        this.value = ''
        break
    }
  }

  convertToApi(): IAqbComparisonOperatorNode {
    return {
      _type: AqbNodeType.ComparisonOperator,
      statement: this.convertFieldToApi(),
      symbol: this.comparisonOperator,
      value: this.convertValueToApi(),
    }
  }

  convertValueToApi(): IAqbParameterNode | IAqbSimpleValueNode {
    if (this.isParameterType) {
      if (!this.parameterName || !this.parameterName.length) {
        this.parameterName = 'parameter_' + IdHelperService.getSimpleId()
      }
      return {
        _type: AqbNodeType.ParameterValue,
        type: this.rmType,
        name: this.parameterName,
      }
    }

    const value = convertParameterInputToType(this.valueType, this.value)

    return { _type: AqbNodeType.SimpleValue, value } as IAqbSimpleValueNode
  }

  convertFieldToApi(): IAqbSelectFieldNode {
    return {
      _type: AqbNodeType.SelectField,
      aqlPath: this.aqlPath,
      containmentId: this.archetypeReferenceId,
      name: this.givenName,
    }
  }
}
