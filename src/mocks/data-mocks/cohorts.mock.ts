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

import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ICohortApi } from 'src/app/shared/models/project/cohort-api.interface'

export const mockCohort1: ICohortApi = {
  id: 1,
  name: 'Cohort 1',
  description: 'Test',
  projectId: 1,
  cohortGroup: {
    id: 2,
    operator: LogicalOperator.And,
    parameters: null,
    type: ConnectorNodeType.Group,
    children: [
      {
        id: 3,
        operator: null,
        parameters: {},
        type: ConnectorNodeType.Phenotype,
        children: [],
        phenotypeId: 1,
      },
      {
        id: 4,
        operator: null,
        parameters: {},
        type: ConnectorNodeType.Phenotype,
        children: [],
        phenotypeId: 2,
      },
    ],
    phenotypeId: null,
  },
}
