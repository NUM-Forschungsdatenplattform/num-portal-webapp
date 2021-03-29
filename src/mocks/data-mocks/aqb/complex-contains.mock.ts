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

import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { AqbSelectTopDirection } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-top-direction.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'

export const mockComplexContains: IArchetypeQueryBuilder = {
  select: {
    topCount: 13,
    topDirection: AqbSelectTopDirection.Forward,
    statement: [
      {
        _type: AqbNodeType.SelectField,
        containmentId: 1,
        name: 'Bericht ID::value',
        aqlPath: '/context/other_context[at0001]/items[at0002]/value/value',
      },
      {
        _type: AqbNodeType.SelectField,
        containmentId: 2,
        name: 'Geschichte::value',
        aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value',
      },
      {
        _type: AqbNodeType.SelectField,
        containmentId: 3,
        name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
        aqlPath:
          '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
      },
      {
        _type: AqbNodeType.SelectField,
        containmentId: 4,
        name: 'Kommentar::value',
        aqlPath: '/data[at0001]/events[at0002]/data[at0042]/items[at0055]/value/value',
      },
    ],
  },
  contains: {
    _type: AqbNodeType.Containment,
    id: 1,
    archetypeId: 'openEHR-EHR-COMPOSITION.report.v1',
    contains: {
      _type: AqbNodeType.LogicalOperator,
      symbol: LogicalOperator.And,
      values: [
        {
          _type: AqbNodeType.Containment,
          id: 2,
          archetypeId: 'openEHR-EHR-OBSERVATION.story.v1',
        },
        {
          _type: AqbNodeType.Containment,
          id: 3,
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          _type: AqbNodeType.Containment,
          id: 4,
          archetypeId: 'openEHR-EHR-OBSERVATION.exposure_assessment.v0',
        },
      ],
    },
  },
}
