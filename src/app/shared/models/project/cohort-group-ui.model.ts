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
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'
import { AqlUiModel } from '../aql/aql-ui.model'
import { ICohortGroupApi } from './cohort-group-api.interface'

export class CohortGroupUiModel extends ConnectorGroupUiModel<ICohortGroupApi> {
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | AqlUiModel)[]
  indexInGroup: number | null = null
  addedByClick: boolean

  constructor(addedByClick = false) {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
    this.addedByClick = addedByClick
  }

  /**
   * Checks if parameters of children are configured. **Use with caution / propper changedetection!**
   */
  get areParameterConfigured(): boolean {
    return !this.children.some((child) => {
      return child.areParameterConfigured === false
    })
  }

  mapChildrenToUi = (child: ICohortGroupApi): CohortGroupUiModel | AqlUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Aql) {
        return new AqlUiModel(firstChild.query, true)
      }

      const negatedGroup = new CohortGroupUiModel()
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Aql) {
      return new AqlUiModel(child.query, false)
    }

    const newGroup = new CohortGroupUiModel()
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
