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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { CohortBuilderService } from 'src/app/core/services/cohort-builder/cohort-builder.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { GroupIndexPipe } from 'src/app/shared/pipes/group-index.pipe'
import { mockAql1, mockAql2, mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { AqlConnectorGroupComponent } from './aql-connector-group.component'

describe('AqlConnectorGroupComponent', () => {
  let component: AqlConnectorGroupComponent
  let fixture: ComponentFixture<AqlConnectorGroupComponent>

  @Component({ selector: 'num-aql-connector-item', template: '' })
  class StubAqlConnectorItemComponent {
    @Input() aql: AqlUiModel
    @Input() isDisabled: boolean
  }

  const itemEventSubject = new Subject<AqlUiModel>()
  const targetResetSubject = new Subject<never>()
  const mockCohortBuilderService = {
    resetTargets: jest.fn(),
    itemEventObservable$: itemEventSubject.asObservable(),
    targetResetObservable$: targetResetSubject.asObservable(),
  } as unknown as CohortBuilderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlConnectorGroupComponent,
        StubAqlConnectorItemComponent,
        GroupIndexPipe,
        ButtonComponent,
      ],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [{ provide: CohortBuilderService, useValue: mockCohortBuilderService }],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockCohortBuilderService, 'resetTargets')
    fixture = TestBed.createComponent(AqlConnectorGroupComponent)
    component = fixture.componentInstance
    jest.clearAllMocks()
  })

  it('should create', () => {
    component.cohortGroup = new CohortGroupUiModel()
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('When the group components gets initialised with a cohortGroup', () => {
    it('should be the main group if indexInGroup is not specified', () => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()
      expect(component.groupType).toEqual(ConnectorGroupType.Main)
    })

    it('should be the active group and subscribed to the events of new items if it is the main group', () => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()
      expect(component.isActive).toBeTruthy()
      expect((component as any).eventSubscription.closed).toBeFalsy()
    })

    it('should not be a sub group if indexInGroup is specified', () => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.indexInGroup = 1
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
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.indexInGroup = testcase.indexInGroup
      component.parentGroupIndex = testcase.parentGroupIndex

      const change = new SimpleChange(undefined, component.parentGroupIndex, false)
      component.ngOnChanges({ parentGroupIndex: change })
      fixture.detectChanges()

      expect(component.groupIndex).toEqual(testcase.expectedResult)
    })
  })

  describe('When a new group is supposed to be added', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.cohortGroup.children = [
        new CohortGroupUiModel(),
        new AqlUiModel(mockAql1),
        new CohortGroupUiModel(true),
        new AqlUiModel(mockAql2),
      ]
      fixture.detectChanges()
    })

    it('should add the new group to the children', () => {
      component.addGroup()
      expect(component.cohortGroup.children.length).toEqual(5)
    })

    it('should enumerate the groups again', () => {
      component.addGroup()
      const children = component.cohortGroup.children
      const lastItem = children[children.length - 1] as CohortGroupUiModel
      expect(lastItem.indexInGroup).toEqual(3)
    })
  })

  describe('When a group is supposed to be deleted', () => {
    beforeEach(() => {
      jest.spyOn(component.delete, 'emit').mockImplementation()
      component.cohortGroup = new CohortGroupUiModel()
      component.index = 123
      fixture.detectChanges()
    })

    test.each([true, false])(
      'should emit the active-status to the parent group',
      (activeStatus) => {
        component.isActive = activeStatus
        component.deleteSelf()
        expect(component.delete.emit).toHaveBeenCalledWith(component.isActive)
      }
    )
  })

  describe('When an item in the group gets deleted', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.isDisabled = false
      component.cohortGroup.children = [
        new AqlUiModel(mockAql1),
        new CohortGroupUiModel(),
        new AqlUiModel(mockAql2),
        new CohortGroupUiModel(),
      ]
      fixture.detectChanges()
    })

    it('should not enumerate the groups again', () => {
      component.deleteChildItem(0)
      expect(component.cohortGroup.children.length).toEqual(3)
      expect(component.cohortGroup.children[0]).toBeInstanceOf(CohortGroupUiModel)
      expect(component.cohortGroup.children[1]).toBeInstanceOf(AqlUiModel)
      const firstGroupAfterDeletion = component.cohortGroup.children[0] as CohortGroupUiModel
      expect(firstGroupAfterDeletion.indexInGroup).toEqual(null)
    })
  })

  describe('When a group in the group gets deleted', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      component.isDisabled = false
      component.cohortGroup.children = [
        new CohortGroupUiModel(),
        new AqlUiModel(mockAql1),
        new CohortGroupUiModel(),
        new AqlUiModel(mockAql2),
      ]
      fixture.detectChanges()
    })

    it('should enumerate the groups again', () => {
      component.deleteChildGroup(false, 0)
      const firstGroupAfterDeletion = component.cohortGroup.children[1] as CohortGroupUiModel
      expect(component.cohortGroup.children.length).toEqual(3)
      expect(component.cohortGroup.children[0]).toBeInstanceOf(AqlUiModel)
      expect(firstGroupAfterDeletion.indexInGroup).toEqual(1)
    })

    test.each([true, false])(
      'should get the active status if the deleted group was active',
      (wasActive) => {
        component.isActive = false
        component.deleteChildGroup(wasActive, 0)
        expect(component.isActive).toEqual(wasActive)
      }
    )
  })

  describe('When the targetReset event is received', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()
    })

    it('will remove the active status', () => {
      targetResetSubject.next()
      expect(component.isActive).toBeFalsy()
    })

    it('will remove the item event subscription', () => {
      targetResetSubject.next()
      expect((component as any).eventSubscription.closed).toBeTruthy()
    })
  })

  describe('When the group is supposed to be the active target', () => {
    beforeEach(() => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()
    })

    it('will call the service to reset other targets', () => {
      targetResetSubject.next()
      expect(component.isActive).toBeFalsy()

      component.setDestination()
      fixture.detectChanges()
      expect(mockCohortBuilderService.resetTargets).toHaveBeenCalledTimes(1)
    })
  })

  describe('When items are received on the item subscription', () => {
    it('should add them to the cohort groups children', () => {
      component.cohortGroup = new CohortGroupUiModel()
      fixture.detectChanges()

      expect(component.cohortGroup.children.length).toEqual(0)

      itemEventSubject.next(new AqlUiModel(mockAql3))

      expect(component.cohortGroup.children.length).toEqual(1)
    })
  })
})
