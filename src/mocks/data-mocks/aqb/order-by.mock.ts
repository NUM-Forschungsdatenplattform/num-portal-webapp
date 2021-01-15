import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { AqbOrderBy } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-order-by.enum'
import { AqbSelectTopDirection } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-top-direction.enum'

export const mockOrderBy: IArchetypeQueryBuilder = {
  select: {
    topCount: 13,
    topDirection: AqbSelectTopDirection.Forward,
    statement: [
      {
        _type: AqbNodeType.SelectField,
        containmentId: 1,
        name: 'Systolic::magnitude',
        aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude',
      },
      {
        _type: AqbNodeType.SelectField,
        containmentId: 0,
        name: 'ehr_id',
        aqlPath: '/ehr_id/value',
      },
    ],
  },
  ehr: {
    containmentId: 0,
  },
  contains: {
    _type: AqbNodeType.Containment,
    id: 1,
    archetypeId: 'openEHR-EHR-OBSERVATION.sample_blood_pressure.v1',
  },
  orderBy: [
    {
      symbol: AqbOrderBy.Asc,
      statement: {
        _type: AqbNodeType.SelectField,
        containmentId: 1,
        name: 'Systolic::magnitude',
        aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude',
      },
    },
    {
      symbol: AqbOrderBy.Desc,
      statement: {
        _type: AqbNodeType.SelectField,
        containmentId: 0,
        name: 'ehr_id',
        aqlPath: '/ehr_id/value',
      },
    },
  ],
}
