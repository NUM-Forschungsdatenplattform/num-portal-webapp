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

import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'

export const mockSimpleContainment: IContainmentNode = {
  archetypeId: 'openEHR-EHR-OBSERVATION.test.v1',
  children: [
    {
      archetypeId: 'openEHR-EHR-OBSERVATION_lets_cover_this_branch',
      children: [],
      fields: [
        {
          name: 'test_field1_1::value',
          rmType: ReferenceModelType.Double,
          aqlPath: 'test/path1-1',
          humanReadablePath: 'test/path1-1/human',
        },
      ],
    },
  ],
  fields: [
    {
      name: 'test_field1::value',
      rmType: ReferenceModelType.String,
      aqlPath: 'test/path1',
      humanReadablePath: 'test/path1/human',
    },
    {
      name: 'test_field2::value',
      rmType: ReferenceModelType.Double,
      aqlPath: 'test/path2',
      humanReadablePath: 'test/path2/human',
    },
  ],
}
