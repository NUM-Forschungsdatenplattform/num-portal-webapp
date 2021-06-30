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

import { LogicalOperator } from '../logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { PARAMETER_REGEX } from '../../../core/constants/constants'
import { ConnectorMainNodeUi } from '../connector-main-node-ui.interface'
import { IAqlCohortApi } from './aql-cohort.interface'
import { IUser } from '../user/user.interface'
import { ICohortGroupApi } from '../project/cohort-group-api.interface'
import { IAqlParameter } from './aql-parameter.interface'
import { IDictionary } from '../dictionary.interface'
import { AqlParameterOperator } from './aql-parameter-operator.type'

export class AqlUiModel implements ConnectorMainNodeUi<ICohortGroupApi> {
  private readonly OPERATOR_SUFFIX = '__OPERATOR'
  private readonly NAME_SUFFIX = '__NAME'

  type: ConnectorNodeType.Aql
  id: number
  name: string
  query: string
  queryWithOperatorPlaceholder: string
  isNegated: boolean
  parameters: IAqlParameter[]
  areParameterConfigured = true
  indexInGroup: number | null
  purpose: string
  use: string
  owner?: IUser | null

  constructor(aql: IAqlCohortApi, isNegated: boolean = false) {
    this.type = ConnectorNodeType.Aql
    this.id = aql.id
    this.name = aql.name
    this.query = aql.query
    this.isNegated = isNegated
    this.purpose = aql.purpose
    this.use = aql.use
    this.owner = aql.owner

    this.collectParameters()
    if (this.parameters.length) {
      this.areParameterConfigured = false
    }
  }

  private collectParameters(): void {
    this.parameters = (this.query.match(PARAMETER_REGEX) || []).map((name) => {
      return {
        name,
        value: undefined,
        archetypeId: undefined,
        operator: undefined,
        path: undefined,
      }
    })

    this.parameters.forEach((parameter) => {
      const parameterPathRegex = new RegExp(`\\S+\\s+\\S+\\s+\\${parameter.name}`, 'gmi')
      const fullParameterPath = this.query.match(parameterPathRegex)[0]
      const fullParameterPathSplitted = fullParameterPath.split(' ')
      const archetypeReferenceId = fullParameterPathSplitted[0].match(/\w+/)[0]
      const archetypeIdRegex = new RegExp(`(?<=${archetypeReferenceId}\\[)(.+?)(?=\s*])`)

      parameter.operator =
        fullParameterPathSplitted[1] in AqlParameterOperator
          ? (fullParameterPathSplitted[1] as AqlParameterOperator)
          : AqlParameterOperator['!=']
      parameter.path = fullParameterPathSplitted[0].split(archetypeReferenceId)[1]
      parameter.archetypeId = this.query.match(archetypeIdRegex)[0]

      const pathWithInjectedPlaceholder = fullParameterPath
        .replace(parameter.name, parameter.name + this.NAME_SUFFIX)
        .replace(parameter.operator, parameter.name + this.OPERATOR_SUFFIX)

      this.queryWithOperatorPlaceholder = (this.queryWithOperatorPlaceholder
        ? this.queryWithOperatorPlaceholder
        : this.query
      ).replace(fullParameterPath, pathWithInjectedPlaceholder)
    })
  }

  public convertToApi(): ICohortGroupApi {
    return this.isNegated ? this.convertToNegatedApiGroup() : this.getAqlForApi()
  }

  private getAqlForApi(): ICohortGroupApi {
    return {
      type: ConnectorNodeType.Aql,
      parameters: this.convertParametersToApi(),
      query: {
        id: this.id,
        name: this.name,
        query: this.parameters.length
          ? this.insertOperatorForApi(this.queryWithOperatorPlaceholder)
          : this.query,
        purpose: this.purpose,
        use: this.use,
        owner: this.owner,
      },
    }
  }

  private convertToNegatedApiGroup(): ICohortGroupApi {
    return {
      type: ConnectorNodeType.Group,
      operator: LogicalOperator.Not,
      children: [this.getAqlForApi()],
    }
  }

  private convertParametersToApi(): IDictionary<string, string> {
    return this.parameters.reduce((dictionary, parameter) => {
      dictionary[parameter.name] = parameter.value
      return dictionary
    }, {})
  }

  private insertOperatorForApi(queryString: string): string {
    let resultString = queryString
    this.parameters.forEach((parameter) => {
      resultString = resultString
        .replace(parameter.name + this.NAME_SUFFIX, parameter.name)
        .replace(parameter.name + this.OPERATOR_SUFFIX, parameter.operator)
    })
    return resultString
  }
}
