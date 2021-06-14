import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IAqbSelectClick } from '../../../models/aqb/aqb-select-click.interface'
import { AqbSelectDestination } from '../../../models/aqb/aqb-select-destination.enum'
import { IContainmentTreeNode } from '../../../models/containment-tree-node.interface'

export interface ISelectClickTest {
  result: boolean
  mode: AqlBuilderDialogMode
  selectDestination: AqbSelectDestination
  clickEvent: IAqbSelectClick
}

const selectedItemWithRmType: IContainmentTreeNode = {
  name: 'test_field1::value',
  rmType: ReferenceModelType.String,
  aqlPath: 'test/path1',
  humanReadablePath: 'test/path1/human',
  parentArchetypeId: 'openEHR-EHR-OBSERVATION.test.v1',
  displayName: 'Test Field1 | value',
  archetypeId: 'comp1',
}

const selectedItemWithoutRmType: IContainmentTreeNode = {
  name: 'test_field1::value',
  aqlPath: 'test/path1',
  humanReadablePath: 'test/path1/human',
  parentArchetypeId: 'openEHR-EHR-OBSERVATION.test.v1',
  displayName: 'Test Field1 | value',
  archetypeId: 'comp1',
}

export const selectClickTestCases: ISelectClickTest[] = [
  {
    result: true,
    mode: AqlBuilderDialogMode.AqlEditor,
    selectDestination: AqbSelectDestination.Select,
    clickEvent: {
      item: selectedItemWithRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: true,
    mode: AqlBuilderDialogMode.AqlEditor,
    selectDestination: AqbSelectDestination.Select,
    clickEvent: {
      item: selectedItemWithoutRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: true,
    mode: AqlBuilderDialogMode.DataRetrieval,
    selectDestination: AqbSelectDestination.Select,
    clickEvent: {
      item: selectedItemWithoutRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: false,
    mode: AqlBuilderDialogMode.DataRetrieval,
    selectDestination: AqbSelectDestination.Select,
    clickEvent: {
      item: selectedItemWithoutRmType,
      compositionId: 'comp2',
      templateId: 'temp1',
    },
  },
  // Where
  {
    result: false,
    mode: AqlBuilderDialogMode.AqlEditor,
    selectDestination: AqbSelectDestination.Where,
    clickEvent: {
      item: selectedItemWithoutRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: false,
    mode: AqlBuilderDialogMode.DataRetrieval,
    selectDestination: AqbSelectDestination.Where,
    clickEvent: {
      item: selectedItemWithoutRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: true,
    mode: AqlBuilderDialogMode.AqlEditor,
    selectDestination: AqbSelectDestination.Where,
    clickEvent: {
      item: selectedItemWithRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
  {
    result: true,
    mode: AqlBuilderDialogMode.DataRetrieval,
    selectDestination: AqbSelectDestination.Where,
    clickEvent: {
      item: selectedItemWithRmType,
      compositionId: 'comp1',
      templateId: 'temp1',
    },
  },
]
