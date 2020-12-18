import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'

export const mockMultiComps: IArchetypeQueryBuilder = {
  select: {
    statement: [
      {
        _type: AqbNodeType.SelectField,
        containmentId: 0,
        name: 'ehr_id',
        aqlPath: '/ehr_id/value',
      },
      {
        _type: AqbNodeType.SelectField,
        containmentId: 1,
        name: 'Bericht ID::value',
        aqlPath: '/context/other_context[at0001]/items[at0002]/value/value',
      },
    ],
  },
  ehr: {
    containmentId: 0,
  },
  contains: {
    _type: AqbNodeType.LogicalOperator,
    symbol: LogicalOperator.And,
    values: [
      {
        _type: AqbNodeType.Containment,
        id: 2,
        archetypeId: 'openEHR-EHR-COMPOSITION.prescription.v1',
      },
      {
        _type: AqbNodeType.Containment,
        id: 1,
        archetypeId: 'openEHR-EHR-COMPOSITION.report.v1',
      },
    ],
  },
}
