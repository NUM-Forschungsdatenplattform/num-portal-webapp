import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

import { AqlBuilderContainsComponent } from './aql-builder-contains.component'

describe('AqlBuilderContainsComponent', () => {
  let component: AqlBuilderContainsComponent
  let fixture: ComponentFixture<AqlBuilderContainsComponent>

  const deleteArchetypeEmitter = new EventEmitter()
  const deleteCompositionEmitter = new EventEmitter()
  @Component({ selector: 'num-aql-builder-contains-group', template: '' })
  class ContainsGroupStubComponent {
    @Input() group: any
    @Input() parentGroupIndex: any
    @Input() index: any
    @Output() deleteArchetypes = deleteArchetypeEmitter
    @Output() deleteComposition = deleteCompositionEmitter
  }

  const mockComposition1 = {
    compositionId: 'test1',
  } as AqbContainsCompositionUiModel

  const mockComposition2 = {
    compositionId: 'test2',
  } as AqbContainsCompositionUiModel

  const mockCompositions = [mockComposition1, mockComposition2]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsComponent, ContainsGroupStubComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsComponent)
    component = fixture.componentInstance
    component.aqbModel = new AqbUiModel()
    component.compositions = mockCompositions
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a composition is supposed to be deleted on behalf of the child group', () => {
    beforeEach(() => {
      jest.spyOn(component.aqbModel, 'handleDeletionByComposition').mockImplementation()
      deleteCompositionEmitter.emit('test1')
    })
    it('should call the aqbModel to handle the deletion by composition', () => {
      expect(component.aqbModel.handleDeletionByComposition).toHaveBeenCalledWith(['test1'])
    })

    it('should filter the compositions to keep the other compositions and delete the desired composition', () => {
      expect(component.compositions.length).toEqual(1)
      expect(component.compositions[0].compositionId).toEqual('test2')
    })
  })

  describe('When an archetype root element is supposed to be deleted on behalf of the item', () => {
    beforeEach(() => {
      jest.spyOn(component.aqbModel, 'handleDeletionByArchetype').mockImplementation()
      deleteArchetypeEmitter.emit(['test1'])
    })
    it('should call the aqbModel to handle the deletion by archetype', () => {
      expect(component.aqbModel.handleDeletionByArchetype).toHaveBeenCalledWith(['test1'])
    })
  })
})
