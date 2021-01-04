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
import { AqbContainsGroupUiModel } from '../../models/aqb/aqb-contains-group-ui.model'

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
      component.group.indexInGroup = testcase.indexInGroup
      component.parentGroupIndex = testcase.parentGroupIndex

      const change = new SimpleChange(undefined, component.parentGroupIndex, false)
      component.ngOnChanges({ parentGroupIndex: change })
      fixture.detectChanges()

      expect(component.groupIndex).toEqual(testcase.expectedResult)
    })
  })
})
