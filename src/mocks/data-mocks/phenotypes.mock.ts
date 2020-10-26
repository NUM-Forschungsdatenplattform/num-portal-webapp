import { LogicalOperator } from 'src/app/core/models/logical-operator.enum';
import { PhenotypeQueryType } from 'src/app/core/models/phenotype-query-type.enum';
import { IPhenotype } from 'src/app/core/models/phenotype.interface';

export const mockPhenotype1: IPhenotype = {
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
};

export const mockPhenotype2: IPhenotype = {
  name: 'Secon Blood pressure',
  description: 'Second but the same Blood pressure',
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
};

export const mockPhenotypes: IPhenotype[] = [mockPhenotype1, mockPhenotype2];