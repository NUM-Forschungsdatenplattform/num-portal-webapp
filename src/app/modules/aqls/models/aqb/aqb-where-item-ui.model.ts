import { IAqbComparisonOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator-node.interface'
import { AqbComparisonOperator } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator.enum'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { IAqbParameterNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-parameter-node.interface'
import { IAqbSelectFieldNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-field-node.interface'
import { IAqbSimpleValueNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-simple-value-node.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IContainmentTreeNode } from '../containment-tree-node.interface'
import {
  COMPARISON_OPERATOR_OPTIONS_EQUALS,
  COMPARISON_OPERATOR_OPTIONS_INEQUALS,
} from './aqb-comparison-operator-options'
import { IComparisonOperatorOption } from './aqb-comparison-operator-options.interface'
import { AqbValueType } from './aqb-where-value-type.enum'

import { DateHelperService } from 'src/app/core/helper/date-helper.service'
import { IdHelperService } from 'src/app/core/helper/id-helper.service'

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
  valueType: AqbValueType

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
    this.aqlPath = item.aqlPath || ''
    this.humanReadablePath = item.humanReadablePath
    this.compositionReferenceId = compositionReferenceId
    this.archetypeReferenceId = archetypeReferenceId

    this.comparisonOperator = AqbComparisonOperator.Eq

    this.isParameterType = false
    this.configureOptions()
    this.configureInput()
  }

  configureOptions(): void {
    switch (this.rmType) {
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
        this.valueType = AqbValueType.Boolean
        this.value = true
        break
      case ReferenceModelType.Double:
        this.valueType = AqbValueType.Double
        this.value = 1.1
        break
      case ReferenceModelType.Integer:
      case ReferenceModelType.Integer64:
      case ReferenceModelType.Long:
        this.valueType = AqbValueType.Number
        this.value = 0
        break
      case ReferenceModelType.Dv_date:
        this.valueType = AqbValueType.Date
        this.value = new Date()
        break
      case ReferenceModelType.Dv_date_time:
        this.valueType = AqbValueType.DateTime
        this.value = new Date()
        break
      case ReferenceModelType.Dv_time:
        this.valueType = AqbValueType.Time
        this.value = new Date()
        break

      default:
        this.valueType = AqbValueType.String
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

    let value

    switch (this.valueType) {
      case AqbValueType.Date:
        value = DateHelperService.getDateString(this.value as Date)
        break
      case AqbValueType.Time:
        value = DateHelperService.getTimeString(this.value as Date)
        break
      case AqbValueType.DateTime:
        value = DateHelperService.getIsoString(this.value as Date)
        break
      case AqbValueType.Number:
        value = parseInt(this.value as string, 10)
        value = isNaN(value) ? 0 : value
        break
      case AqbValueType.Double:
        value = parseFloat(this.value.toString().replace(',', '.'))
        value = isNaN(value) ? 0 : value
        break
      case AqbValueType.Boolean:
        value = this.value && this.value !== 'false'
        break

      default:
        value = this.value
        break
    }

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