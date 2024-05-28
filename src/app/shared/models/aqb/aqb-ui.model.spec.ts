import { IAqbSelectClick } from './aqb-select-click.interface'
import { AqbUiModel } from './aqb-ui.model'

describe('AqbUiModel', () => {
  let model: AqbUiModel

  const clickEvent1: IAqbSelectClick = {
    compositionId: 'testCompId1',
    templateId: 'testTemplId1',
    item: {
      archetypeId: 'testArchetypeId1',
      displayName: 'test1',
      name: 'test1',
    },
  }

  const clickEvent2: IAqbSelectClick = {
    compositionId: 'testCompId2',
    templateId: 'testTemplId2',
    item: {
      displayName: 'test2',
      name: 'test2',
      parentArchetypeId: 'testArchetypeId2',
    },
  }

  const clickEvent3: IAqbSelectClick = {
    compositionId: 'testCompId3',
    templateId: 'testTemplId3',
    item: {
      displayName: 'test3',
      name: 'test3',
      parentArchetypeId: 'testCompId3',
    },
  }

  beforeEach(() => {
    model = new AqbUiModel()
  })

  describe('When an element is selected', () => {
    beforeEach(() => {
      jest.spyOn(model.contains, 'setContains')
      model.handleElementSelect(clickEvent1)
      model.handleElementSelect(clickEvent2)
    })
    it('should push the selected elements into the select clause', () => {
      expect(model.select.length).toEqual(2)
      expect(model.select[0].compositionReferenceId).toEqual(1)
      expect(model.select[0].archetypeReferenceId).toEqual(2)
      expect(model.select[1].compositionReferenceId).toEqual(3)
      expect(model.select[1].archetypeReferenceId).toEqual(4)
    })

    it('should allow duplicates in the select clause but not in the contains', () => {
      model.handleElementSelect(clickEvent1)
      const expectedItemLength = 3
      expect(model.select.length).toEqual(expectedItemLength)
      expect(model.select[expectedItemLength - 1].compositionReferenceId).toEqual(1)
      expect(model.select[expectedItemLength - 1].archetypeReferenceId).toEqual(2)
    })

    it('should set the corresponding contains', () => {
      expect(model.contains.setContains).toHaveBeenCalledTimes(2)
      expect(model.contains.setContains).toHaveBeenCalledWith(
        clickEvent1.templateId,
        clickEvent1.compositionId,
        1,
        clickEvent1.item.archetypeId,
        2
      )
      expect(model.contains.setContains).toHaveBeenCalledWith(
        clickEvent2.templateId,
        clickEvent2.compositionId,
        3,
        clickEvent2.item.parentArchetypeId,
        4
      )
    })
  })

  describe('When a composition is deleted', () => {
    beforeEach(() => {
      jest.spyOn(model.contains, 'deleteCompositions')
      // Prefill
      model.handleElementSelect(clickEvent1)
      model.handleElementSelect(clickEvent2)
      model.handleDeletionByCompositionReferenceIds([1])
    })
    it('should delete the composition in the contains', () => {
      expect(model.contains.deleteCompositions).toHaveBeenLastCalledWith([1])
    })

    it('should remove the items in the select clause corresponding to the compositionReferenceId', () => {
      expect(model.select.length).toEqual(1)
      expect(model.select[0].compositionReferenceId).toEqual(3)
    })
  })

  describe('When an archetype root element is deleted', () => {
    beforeEach(() => {
      jest.spyOn(model.contains, 'deleteCompositions')
      // Prefill
      model.handleElementSelect(clickEvent1)
      model.handleElementSelect(clickEvent2)
      model.handleDeletionByArchetypeReferenceIds([2, /* not existing -> */ 123456789])
    })

    it('should remove the items in the select clause corresponding to the archetypeReferenceId', () => {
      expect(model.select.length).toEqual(1)
      expect(model.select[0].compositionReferenceId).toEqual(3)
    })
  })

  describe('When the model gets converted to the api model', () => {
    beforeEach(() => {
      jest.spyOn(model.contains, 'deleteCompositions')
      // Prefill
      model.handleElementSelect(clickEvent3)
      model.handleElementSelect(clickEvent3)
      model.handleElementSelect(clickEvent3)
    })

    it('should convert with unique aliases', () => {
      const convertedModel = model.convertToApi()
      expect(convertedModel.select.statement[0].alias).toEqual('test3')
      expect(convertedModel.select.statement[1].alias).toEqual('test3_2')
      expect(convertedModel.select.statement[2].alias).toEqual('test3_3')
    })
  })
})
