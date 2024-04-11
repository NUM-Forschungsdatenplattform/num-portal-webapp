import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { AqbComparisonOperator } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator.enum'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { AqbSelectTopDirection } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-top-direction.enum'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'

export const mockComplexeWhere: IArchetypeQueryBuilder = {
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
  where: {
    _type: AqbNodeType.LogicalOperator,
    symbol: LogicalOperator.And,
    values: [
      {
        _type: AqbNodeType.ComparisonOperator,
        statement: {
          _type: AqbNodeType.SelectField,
          containmentId: 1,
          name: 'Systolic::magnitude',
          aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude',
        },
        symbol: AqbComparisonOperator.Gt_eq,
        value: {
          _type: AqbNodeType.ParameterValue,
          name: 'magnitude',
          type: ReferenceModelType.Double,
        },
      },
      {
        _type: AqbNodeType.ComparisonOperator,
        statement: {
          _type: AqbNodeType.SelectField,
          containmentId: 1,
          name: 'Systolic::magnitude',
          aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude',
        },
        symbol: AqbComparisonOperator.Lt,
        value: {
          _type: AqbNodeType.SimpleValue,
          value: 1.1,
        },
      },
    ],
  },
}
