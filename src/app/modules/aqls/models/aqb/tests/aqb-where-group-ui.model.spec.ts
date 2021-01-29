import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IContainmentTreeNode } from '../../containment-tree-node.interface'
import { AqbWhereGroupUiModel } from '../aqb-where-group-ui.model'
import { AqbWhereItemUiModel } from '../aqb-where-item-ui.model'
import { json1, json2, json3 } from './groupConvertResult'

describe('AqbWhereGroupUiModel', () => {
  const compositionId = 'opnEHR-EHR-COMPOSITION.report.v1'
  const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'

  const itemBase: IContainmentTreeNode = {
    archetypeId,
    parentArchetypeId: compositionId,
    displayName: 'Test',
    aqlPath: '/path',
    name: 'test',
  }

  const item1: IContainmentTreeNode = {
    ...itemBase,
    rmType: ReferenceModelType.Dv_text,
  }
  const item2: IContainmentTreeNode = {
    ...itemBase,
    rmType: ReferenceModelType.Dv_boolean,
  }
  const item3: IContainmentTreeNode = {
    ...itemBase,
    rmType: ReferenceModelType.Long,
  }
  const item4: IContainmentTreeNode = {
    ...itemBase,
    rmType: ReferenceModelType.Double,
  }

  const whereItem1 = new AqbWhereItemUiModel(item1, 1, 2)
  const whereItem2 = new AqbWhereItemUiModel(item2, 3, 4)
  const whereItem3 = new AqbWhereItemUiModel(item3, 5, 6)
  const whereItem4 = new AqbWhereItemUiModel(item4, 5, 7)

  it('should handle the deletion by composition ref ids', () => {
    const group = new AqbWhereGroupUiModel()
    const group2 = new AqbWhereGroupUiModel()
    group.children = [whereItem1, whereItem2, whereItem3, whereItem4, group2]

    group.handleDeletionByComposition([1, 3])
    expect(group.children.length).toEqual(2)
  })

  it('should handle the deletion by archetype ref ids', () => {
    const group = new AqbWhereGroupUiModel()
    const group2 = new AqbWhereGroupUiModel()
    group.children = [whereItem1, whereItem2, whereItem3, whereItem4, group2]

    group.handleDeletionByArchetype([2, 4, 6])
    expect(group.children.length).toEqual(1)
  })

  it('should convert as expected', () => {
    const group = new AqbWhereGroupUiModel()
    group.children = [whereItem1]
    const result = group.convertToApi()

    expect(result).toEqual(json1)
  })

  it('should convert as expected', () => {
    const group = new AqbWhereGroupUiModel()
    group.children = [whereItem1, whereItem2]

    const result = group.convertToApi()
    expect(result).toEqual(json2)
  })

  it('should convert as expected', () => {
    const group = new AqbWhereGroupUiModel()
    group.children = [whereItem1, whereItem2, whereItem3]
    const result = group.convertToApi()

    expect(result).toEqual(json3)
  })
})
