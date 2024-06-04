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
        _type: AqbNodeType.SelectExpression,
        alias: 'Bericht ID::value',
        columnExpression: {
          _type: AqbNodeType.IdentifiedPath,
          root: 'o1',
          path: '/context/other_context[at0001]/items[at0002]/value/value',
        },
      },
      {
        _type: AqbNodeType.SelectExpression,
        alias: 'Geschichte::value',
        columnExpression: {
          _type: AqbNodeType.IdentifiedPath,
          root: 'o1',
          path: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value',
        },
      },
      {
        _type: AqbNodeType.SelectExpression,
        alias: 'Bezeichnung des Symptoms oder Anzeichens.::value',
        columnExpression: {
          _type: AqbNodeType.IdentifiedPath,
          root: 'o1',
          path: '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
        },
      },
      {
        _type: AqbNodeType.SelectExpression,
        alias: 'Kommentar::value',
        columnExpression: {
          _type: AqbNodeType.IdentifiedPath,
          root: 'o1',
          path: '/data[at0001]/events[at0002]/data[at0042]/items[at0055]/value/value',
        },
      },
    ],
  },
  from: {
    _type: AqbNodeType.Containment,
    predicates: 'openEHR-EHR-COMPOSITION.report.v1',
    type: 'COMPOSITION',
    identifier: 'c1',
    contains: {
      _type: AqbNodeType.LogicalOperator,
      symbol: LogicalOperator.And,
      values: [
        {
          _type: AqbNodeType.Containment,
          predicates: 'openEHR-EHR-OBSERVATION.story.v1',
          type: 'OBSERVATION',
          identifier: 'o1',
        },
        {
          _type: AqbNodeType.Containment,
          predicates: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
          type: 'OBSERVATION',
          identifier: 'o2',
        },
        {
          _type: AqbNodeType.Containment,
          predicates: 'openEHR-EHR-OBSERVATION.exposure_assessment.v0',
          type: 'OBSERVATION',
          identifier: 'o3',
        },
      ],
    },
  },
}
