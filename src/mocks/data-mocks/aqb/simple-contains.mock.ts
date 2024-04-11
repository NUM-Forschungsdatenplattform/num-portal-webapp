import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { AqbSelectTopDirection } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-top-direction.enum'

export const mockSimpleContains: IArchetypeQueryBuilder = {
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
    ],
  },
  contains: {
    _type: AqbNodeType.Containment,
    id: 1,
    archetypeId: 'openEHR-EHR-COMPOSITION.report.v1',
  },
}
