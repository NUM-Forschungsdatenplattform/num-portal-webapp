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
import { PhenotypeUiModel } from '../phenotype/phenotype-ui.model'
import { ConnectorNodeType } from '../connector-node-type.enum'
import { ConnectorGroupUiModel } from '../connector-group-ui.model'
import { ICohortGroupApi } from './cohort-group-api.interface'
import { ICohortApi } from './cohort-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { Subject } from 'rxjs'

export class CohortGroupUiModel extends ConnectorGroupUiModel {
  changeDetectionTrigger$ = new Subject()
  type: ConnectorNodeType.Group
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  isNegated: boolean
  children: (CohortGroupUiModel | PhenotypeUiModel)[]
  indexInGroup: number | null = null

  constructor(cohortApi?: ICohortApi, private phenotypeService?: PhenotypeService) {
    super()
    this.type = ConnectorNodeType.Group
    this.logicalOperator = LogicalOperator.And
    this.isNegated = false
    this.children = []
  }

  /**
   * Checks if parameters of children are configured. **Use with caution / propper changedetection!**
   */
  get areParameterConfigured(): boolean {
    return !this.children.some((child) => {
      return child.areParameterConfigured === false
    })
  }

  mapChildrenToUi = (child: ICohortGroupApi): CohortGroupUiModel | PhenotypeUiModel => {
    if (child.type === ConnectorNodeType.Group && child.operator === LogicalOperator.Not) {
      const firstChild = child.children[0]

      if (firstChild.type === ConnectorNodeType.Phenotype) {
        const model = new PhenotypeUiModel()
        model.isLoadingComplete = model.areParameterConfigured = false
        this.phenotypeService.get(firstChild.phenotypeId).subscribe((phenotype) => {
          model.init(phenotype, true, firstChild.parameters)
          model.isLoadingComplete = true
          this.changeDetectionTrigger$.next()
        })
        return model
      }
      const negatedGroup = new CohortGroupUiModel(undefined, this.phenotypeService)
      negatedGroup.convertToUi(firstChild, true)
      return negatedGroup
    }

    if (child.type === ConnectorNodeType.Phenotype) {
      const model = new PhenotypeUiModel()
      model.isLoadingComplete = model.areParameterConfigured = false
      this.phenotypeService.get(child.phenotypeId).subscribe((phenotype) => {
        model.init(phenotype, false, child.parameters)
        model.isLoadingComplete = true
        this.changeDetectionTrigger$.next()
      })
      return model
    }
    const newGroup = new CohortGroupUiModel(undefined, this.phenotypeService)
    newGroup.convertToUi(child, false)
    return newGroup
  }
}
