/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input, SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { ArchetypePipe } from 'src/app/shared/pipes/archetype.pipe'
import { GroupIndexPipe } from 'src/app/shared/pipes/group-index.pipe'
import { AqbContainsCompositionUiModel } from '../../../../shared/models/aqb/aqb-contains-composition-ui.model'
import { AqbContainsGroupUiModel } from '../../../../shared/models/aqb/aqb-contains-group-ui.model'
import { AqbContainsItemUiModel } from '../../../../shared/models/aqb/aqb-contains-item-ui.model'

import { AqlBuilderContainsGroupComponent } from './aql-builder-contains-group.component'

describe('AqlBuilderContainsGroupComponent', () => {
  let component: AqlBuilderContainsGroupComponent
  let fixture: ComponentFixture<AqlBuilderContainsGroupComponent>

  @Component({ selector: 'num-aql-builder-contains-item', template: '' })
  class ContainsItemStubComponent {
    @Input()
    item: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlBuilderContainsGroupComponent,
        ContainsItemStubComponent,
        ButtonComponent,
        ArchetypePipe,
        GroupIndexPipe,
      ],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsGroupComponent)
    component = fixture.componentInstance
  })

  describe('When the group components gets initialised with a contains group', () => {
    it('should be the main group if indexInGroup is not specified', () => {
      component.group = new AqbContainsGroupUiModel()
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Main)
    })

    it('should not be a sub group if indexInGroup is specified', () => {
      component.group = new AqbContainsGroupUiModel()
      component.group.indexInGroup = 1
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Sub)
    })
  })

  describe('When input values are changed', () => {
    const case1 = {
      parentGroupIndex: null,
      indexInGroup: 1,
      expectedResult: [1],
    }
    const case2 = {
      parentGroupIndex: [1, 2, 3],
      indexInGroup: 1,
      expectedResult: [1, 2, 3, 1],
    }

    const case3 = {
      parentGroupIndex: null,
      indexInGroup: null,
      expectedResult: [],
    }
    test.each([case1, case2, case3])('should reevaluate the groupIndex', (testcase) => {
      component.group = new AqbContainsGroupUiModel()
      const child1 = new AqbContainsItemUiModel('testComp1', 1, 'testArchetypeId1', 2)
      const child2 = new AqbContainsGroupUiModel()
      component.group.children = [child1, child2]
      component.group.indexInGroup = testcase.indexInGroup
      component.parentGroupIndex = testcase.parentGroupIndex

      const change = new SimpleChange(undefined, component.parentGroupIndex, false)
      component.ngOnChanges({ parentGroupIndex: change })
      fixture.detectChanges()

      expect(component.groupIndex).toEqual(testcase.expectedResult)
    })
  })

  describe('When the group is supposed to be deleted', () => {
    it('should emit its index if its not a composition group', () => {
      component.index = 123
      jest.spyOn(component.delete, 'emit')
      component.deleteSelf()
      expect(component.delete.emit).toHaveBeenCalledWith(component.index)
    })

    it('should emit the composition id if its a composition', () => {
      const compId = 'testCompositionId'
      const templId = 'testTemplateId'
      const compReferenceId = 1
      component.group = new AqbContainsCompositionUiModel(templId, compId, compReferenceId)
      jest.spyOn(component.deleteCompositionByReferenceId, 'emit')
      component.deleteSelf()
      expect(component.deleteCompositionByReferenceId.emit).toHaveBeenCalledWith(compReferenceId)
    })
  })

  describe('When a child item is supposed to be deleted from the group', () => {
    beforeEach(() => {
      jest.spyOn(component.deleteArchetypesByReferenceIds, 'emit')
      component.group = new AqbContainsGroupUiModel()
      const child1 = new AqbContainsItemUiModel('testComp1', 1, 'testArchetypeId1', 2)
      const child2 = new AqbContainsItemUiModel('testComp2', 3, 'testArchetypeId2', 4)
      component.group.children = [child1, child2]

      component.deleteChildItem(1, 4)
    })

    it('should delete the item from the group based on its index', () => {
      expect(component.group.children.length).toEqual(1)
    })

    it('should emit the archetypeReferenceId to the parent', () => {
      expect(component.deleteArchetypesByReferenceIds.emit).toHaveBeenCalledWith([4])
    })
  })
})
