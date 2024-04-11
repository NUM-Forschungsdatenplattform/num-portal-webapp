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
