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
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { PARAMETER_REGEX } from '../../../core/constants/constants'
import { ConnectorMainNodeUi } from '../connector-main-node-ui.interface'
import { IAqlPhenotypeApi } from './aql-phenotype.interface'

export class AqlUiModel implements ConnectorMainNodeUi {
  type: ConnectorNodeType.Aql
  id: number
  name: string
  query: string
  isNegated: boolean
  parameter: { name: string; value?: string }[]
  areParameterConfigured = true
  indexInGroup: number | null

  constructor(aql: IAqlPhenotypeApi, isNegated: boolean = false) {
    this.type = ConnectorNodeType.Aql
    this.id = aql.id
    this.name = aql.name
    this.query = aql.query
    this.isNegated = isNegated
    this.parameter = (aql.query.match(PARAMETER_REGEX) || []).map((name) => {
      return { name, value: undefined }
    })

    if (this.parameter.length) {
      this.areParameterConfigured = false
    }
  }

  public convertToApi(): IPhenotypeQueryApi {
    return this.isNegated ? this.convertToNegatedApiGroup() : this.getAqlForApi()
  }

  private getAqlForApi(): IPhenotypeQueryApi {
    return {
      type: ConnectorNodeType.Aql,
      aql: {
        id: this.id,
        name: this.name,
        query: this.insertParamsForApi(this.query),
      },
    }
  }

  private convertToNegatedApiGroup(): IPhenotypeQueryApi {
    return {
      type: ConnectorNodeType.Group,
      operator: LogicalOperator.Not,
      children: [this.getAqlForApi()],
    }
  }

  private insertParamsForApi(queryString: string): string {
    let resultString = queryString
    this.parameter.forEach((param) => {
      resultString = resultString.replace(param.name, param.value ? param.value : param.name)
    })
    return resultString
  }
}
