import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { PhenotypeQueryType } from 'src/app/shared/models/phenotype/phenotype-query-type.enum'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'

export const mockPhenotype1: IPhenotypeApi = {
  name: 'Blood pressure',
  description: 'Blood pressure is relevant for this and that',
  id: 1,
  query: {
    type: PhenotypeQueryType.Group,
    operator: LogicalOperator.And,
    children: [
      {
        type: PhenotypeQueryType.Group,
        operator: LogicalOperator.Or,
        children: [
          {
            type: PhenotypeQueryType.Aql,
            aql: {
              id: 1,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
          {
            type: PhenotypeQueryType.Aql,
            aql: {
              id: 2,
              name: 'High Blood pressure',
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
            },
          },
          {
            type: PhenotypeQueryType.Aql,
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
        type: PhenotypeQueryType.Group,
        operator: LogicalOperator.Not,
        children: [
          {
            type: PhenotypeQueryType.Aql,
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
        type: PhenotypeQueryType.Aql,
        aql: {
          id: 2,
          name: 'High Blood pressure',
          query:
            "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
        },
      },
    ],
  },
}

export const mockPhenotype2: IPhenotypeApi = {
  description: 'Blood pressure is relevant for this and that',
  id: 2,
  name: 'Blood pressure',
  query: {
    type: PhenotypeQueryType.Group,
    operator: LogicalOperator.Not,
    children: [
      {
        type: PhenotypeQueryType.Group,
        operator: LogicalOperator.And,
        children: [
          {
            type: PhenotypeQueryType.Group,
            operator: LogicalOperator.Not,
            children: [
              {
                type: PhenotypeQueryType.Group,
                operator: LogicalOperator.Or,
                children: [
                  {
                    type: PhenotypeQueryType.Aql,
                    aql: {
                      id: 1,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                    },
                  },
                  {
                    type: PhenotypeQueryType.Aql,
                    aql: {
                      id: 2,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                    },
                  },
                  {
                    type: PhenotypeQueryType.Aql,
                    aql: {
                      id: 3,
                      query:
                        "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                      name: 'High Blood pressure',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: PhenotypeQueryType.Group,
            operator: LogicalOperator.Not,
            children: [
              {
                type: PhenotypeQueryType.Aql,
                aql: {
                  id: 1,
                  query:
                    "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
                  name: 'High Blood pressure',
                },
              },
            ],
          },
          {
            type: PhenotypeQueryType.Aql,
            aql: {
              id: 2,
              query:
                "SELECT o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude, o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude FROM EHR [ehr_id/value='1234'] CONTAINS COMPOSITION [openEHR-EHR-COMPOSITION.encounter.v1] CONTAINS OBSERVATION o [openEHR-EHR-OBSERVATION.blood_pressure.v1] WHERE o/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude >= 140 OR o/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude >= 90",
              name: 'High Blood pressure',
            },
          },
        ],
      },
    ],
  },
}

export const mockPhenotypes: IPhenotypeApi[] = [mockPhenotype1, mockPhenotype2]
