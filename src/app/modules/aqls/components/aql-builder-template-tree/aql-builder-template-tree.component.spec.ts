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
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, throwError } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { mockCoronaAnamnese } from 'src/mocks/data-mocks/aqb/corona-anamnese.mock'
import { mockSimpleContainment } from 'src/mocks/data-mocks/aqb/simple-containment.mock'
import { IAqbSelectClick } from '../../../../shared/models/aqb/aqb-select-click.interface'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

import { AqlBuilderTemplateTreeComponent } from './aql-builder-template-tree.component'

describe('AqlBuilderTemplateTreeComponent', () => {
  let component: AqlBuilderTemplateTreeComponent
  let fixture: ComponentFixture<AqlBuilderTemplateTreeComponent>

  const templateId = 'testId'

  const aqlEditorService = {
    getContainment: jest.fn(),
  } as unknown as AqlEditorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplateTreeComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AqlEditorService,
          useValue: aqlEditorService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderTemplateTreeComponent)
    component = fixture.componentInstance
    component.templateId = templateId
  })

  describe('When it gets initialized with a complex template', () => {
    beforeEach(() => {
      const mockReturn = of(mockCoronaAnamnese)
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation((_) => mockReturn)
      fixture.detectChanges()
    })
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('When it gets initialized with a simple but specific template', () => {
    beforeEach(() => {
      const mockReturn = of(mockSimpleContainment)
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation((_) => mockReturn)
      fixture.detectChanges()
    })
    it('should create and convert as expected', async () => {
      await fixture.whenStable()

      const data = component.nestedDataSource.data

      expect(data.length).toEqual(1)
      expect(data[0].displayName).toEqual('Test')
    })

    it('should handle double clicking on elements', () => {
      jest.spyOn(component.selectedItem, 'emit').mockImplementation()
      const archetypeId = 'openEHR-EHR-OBSERVATION.test.v1'
      const name = 'test_field1::value'
      const nativeElement = fixture.debugElement.nativeElement
      const nodeElement = nativeElement.querySelector(
        `[data-test="aqb__containment__${templateId}__node__${archetypeId}__${name}"]`
      ) as HTMLElement

      const clickEvent = document.createEvent('MouseEvents')
      clickEvent.initEvent('dblclick', true, true)
      nodeElement.dispatchEvent(clickEvent)
      fixture.detectChanges()

      const expectedItem: IContainmentTreeNode = {
        name: 'test_field1::value',
        rmType: ReferenceModelType.String,
        aqlPath: 'test/path1',
        humanReadablePath: 'test/path1/human',
        parentArchetypeId: 'openEHR-EHR-OBSERVATION.test.v1',
        displayName: 'Test Field1 | value',
      }

      const expectedCall: IAqbSelectClick = {
        item: expectedItem,
        compositionId: component.compositionId,
        templateId: component.templateId,
      }
      expect(component.selectedItem.emit).toHaveBeenCalledWith(expectedCall)
    })
  })

  describe('When it gets initialized but can not load the containment', () => {
    it('should display a message to the user', async () => {
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation((_) => throwError('error'))
      fixture.detectChanges()
      await fixture.whenStable()
      const nativeElement = fixture.debugElement.nativeElement
      const errorElement = nativeElement.querySelector(
        '[data-test="aqb__containment__testId__error"]'
      )
      expect(errorElement.textContent).toBeDefined()
    })
  })
})
