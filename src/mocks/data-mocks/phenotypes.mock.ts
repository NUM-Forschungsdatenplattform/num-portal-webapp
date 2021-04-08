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

import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { mockUser } from './admin.mock'

/**
 * id = 1
 */
export const mockPhenotype1: IPhenotypeApi = {
  name: 'Blood pressure1',
  description: 'Blood pressure is relevant for this and that',
  id: 1,
  owner: mockUser,
  query: {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.And,
    children: [
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Or,
        children: [
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 1,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              purpose: 'Some purpose',
              owner: mockUser,
            },
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 2,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              purpose: 'Some other purpose',
              owner: mockUser,
            },
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 3,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              purpose: 'Extra other purpose',
              owner: mockUser,
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Not,
        children: [
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 1,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              purpose: 'Extra other purpose',
              owner: mockUser,
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Aql,
        aql: {
          id: 2,
          name: 'High Blood pressure',
          query:
            "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
          purpose: 'Extra other purpose',
          owner: mockUser,
        },
      },
    ],
  },
}

/**
 * id = 2
 */
export const mockPhenotype2: IPhenotypeApi = {
  description: 'Blood pressure is relevant for this and that',
  id: 2,
  name: 'Blood pressure2',
  owner: mockUser,
  query: {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.Not,
    children: [
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.And,
        children: [
          {
            type: ConnectorNodeType.Group,
            operator: LogicalOperator.Not,
            children: [
              {
                type: ConnectorNodeType.Group,
                operator: LogicalOperator.Or,
                children: [
                  {
                    type: ConnectorNodeType.Aql,
                    aql: {
                      id: 1,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                      purpose: 'Some purpose',
                      owner: mockUser,
                    },
                  },
                  {
                    type: ConnectorNodeType.Aql,
                    aql: {
                      id: 2,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                      purpose: 'Some other purpose',
                      owner: mockUser,
                    },
                  },
                  {
                    type: ConnectorNodeType.Aql,
                    aql: {
                      id: 3,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                      purpose: 'Extra other purpose',
                      owner: mockUser,
                    },
                  },
                ],
              },
            ],
          },
          {
            type: ConnectorNodeType.Group,
            operator: LogicalOperator.Not,
            children: [
              {
                type: ConnectorNodeType.Aql,
                aql: {
                  id: 1,
                  query:
                    "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                  name: 'High Blood pressure',
                  purpose: 'Some purpose',
                  owner: mockUser,
                },
              },
            ],
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 2,
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              name: 'High Blood pressure',
              purpose: 'Some other purpose',
              owner: mockUser,
            },
          },
        ],
      },
    ],
  },
}

/**
 * id = 3, has 2 Parameters(importantParam, otherParam)
 */
export const mockPhenotype3: IPhenotypeApi = {
  name: 'Blood pressure',
  description: 'Blood pressure is relevant for this and that',
  id: 3,
  owner: mockUser,
  query: {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.And,
    children: [
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Or,
        children: [
          {
            type: ConnectorNodeType.Group,
            operator: LogicalOperator.Or,
            children: [
              {
                type: ConnectorNodeType.Aql,
                aql: {
                  id: 1,
                  name: 'High Blood pressure',
                  query:
                    "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                },
              },
            ],
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 2,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 3,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Not,
        children: [
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 1,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Aql,
        aql: {
          id: 2,
          name: 'High Blood pressure',
          query:
            "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= $importantParam OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= $otherParam",
        },
      },
    ],
  },
}

/**
 * id = 4, has 2 Parameters(importantParam, otherParam)
 */
export const mockPhenotype4: IPhenotypeApi = {
  name: 'Blood pressure',
  description: 'Blood pressure is relevant for this and that',
  id: 4,
  owner: mockUser,
  query: {
    type: ConnectorNodeType.Group,
    operator: LogicalOperator.And,
    children: [
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Or,
        children: [
          {
            type: ConnectorNodeType.Group,
            operator: LogicalOperator.Or,
            children: [
              {
                type: ConnectorNodeType.Aql,
                aql: {
                  id: 1,
                  name: 'High Blood pressure',
                  query:
                    "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                },
              },
            ],
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 2,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 3,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Group,
        operator: LogicalOperator.Not,
        children: [
          {
            type: ConnectorNodeType.Aql,
            aql: {
              id: 1,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
        ],
      },
      {
        type: ConnectorNodeType.Aql,
        aql: {
          id: 2,
          name: 'High Blood pressure',
          query:
            "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= $importantParam OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= $otherParam",
        },
      },
    ],
  },
}

export const mockPhenotypes: IPhenotypeApi[] = [mockPhenotype1, mockPhenotype2]
