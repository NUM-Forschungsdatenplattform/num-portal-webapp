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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ArchetypePipe } from 'src/app/shared/pipes/archetype.pipe'
import { AqbSelectItemUiModel } from '../../../../shared/models/aqb/aqb-select-item-ui.model'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

import { AqlBuilderSelectItemComponent } from './aql-builder-select-item.component'

describe('AqlBuilderSelectItemComponent', () => {
  let component: AqlBuilderSelectItemComponent
  let fixture: ComponentFixture<AqlBuilderSelectItemComponent>

  const templateId = 'General Information'
  const compositionId = 'openEHR-EHR-COMPOSITION.report.v1'
  const compositionReferenceId = 1
  const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'
  const archetypeReferenceId = 2

  const containmentTreeNode: IContainmentTreeNode = {
    archetypeId,
    parentArchetypeId: compositionId,
    displayName: 'Test',
  }

  const item = new AqbSelectItemUiModel(
    containmentTreeNode,
    compositionReferenceId,
    archetypeReferenceId,
    false,
    templateId,
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderSelectItemComponent, ArchetypePipe],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderSelectItemComponent)
    component = fixture.componentInstance
    component.item = item
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the item is supposed to be deleted', () => {
    it('should emit the deletion to its parent', () => {
      jest.spyOn(component.deleteItem, 'emit')
      component.deleteSelf()
      expect(component.deleteItem.emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the alias is set', () => {
    it('should set the alias as given name into the ui model', () => {
      const element = fixture.nativeElement.querySelector('input')
      element.value = 'test_input'
      element.dispatchEvent(new Event('input'))
      expect(component.item.givenName).toEqual('test_input')
    })

    test.each(['1abc', 'abc-test', '/path', 'dd!', '{}', '😜'])(
      'should set the current given name if the input is invalid',
      (value) => {
        component.item.givenName = 'before'
        const element = fixture.nativeElement.querySelector('input')
        element.value = value
        element.dispatchEvent(new Event('input'))
        expect(component.item.givenName).toEqual('before')
      },
    )
  })
})
