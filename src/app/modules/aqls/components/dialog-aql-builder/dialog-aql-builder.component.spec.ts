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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { mockAqbTemplates } from 'src/mocks/data-mocks/aqb/aqb-templates.mock'
import { IAqbSelectClick } from '../../../../shared/models/aqb/aqb-select-click.interface'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'
import { COMPILE_ERROR_CONFIG } from './constants'

import { DialogAqlBuilderComponent } from './dialog-aql-builder.component'
import { selectClickTestCases } from './tests/select-click-testcases'

describe('DialogAqlBuilderComponent', () => {
  let component: DialogAqlBuilderComponent
  let fixture: ComponentFixture<DialogAqlBuilderComponent>

  const selectClickEmitter = new EventEmitter<IAqbSelectClick>()
  @Component({ selector: 'num-aql-builder-templates', template: '' })
  class TemplatesStubComponent {
    @Input() templates: any
    @Input() mode: any
    @Input() selectDestination: any

    @Input() selectedTemplates: any
    @Output() selectedItem = selectClickEmitter
  }
  @Component({ selector: 'num-aql-builder-select', template: '' })
  class SelectStubComponent {
    @Input() aqbModel: any
  }
  @Component({ selector: 'num-aql-builder-contains', template: '' })
  class ContainsStubComponent {
    @Input() compositions: any
    @Input() aqbModel: any
  }
  @Component({ selector: 'num-aql-builder-where', template: '' })
  class WhereStubComponent {
    @Input() aqbModel: any
    @Input() dialogMode: any
  }

  const templatesSubject$ = new Subject<IEhrbaseTemplate[]>()

  const aqlEditorService = {
    getTemplates: jest.fn(),
    templatesObservable$: templatesSubject$.asObservable(),
    buildAql: jest.fn(),
  } as unknown as AqlEditorService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAqlBuilderComponent,
        TemplatesStubComponent,
        SelectStubComponent,
        ContainsStubComponent,
        WhereStubComponent,
        ButtonComponent,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: AqlEditorService, useValue: aqlEditorService },
        { provide: ToastMessageService, useValue: mockToastMessageService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAqlBuilderComponent)
    component = fixture.componentInstance
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(aqlEditorService, 'getTemplates').mockImplementation(() => of())
    jest.clearAllMocks()
  })

  describe('When the dialog is in aqlEditor mode', () => {
    beforeEach(() => {
      component.dialogInput = {
        mode: AqlBuilderDialogMode.AqlEditor,
        model: new AqbUiModel(),
      }

      fixture.detectChanges()
    })

    it('should create and fetch templates', () => {
      expect(component).toBeTruthy()
      expect(aqlEditorService.getTemplates).toHaveBeenCalled()
    })

    test.each(selectClickTestCases)(
      'should call or not call the aqb Model to handle the clickEvent',
      (testcase) => {
        jest.spyOn(component.aqbModel, 'handleElementSelect')

        component.dialogInput.mode = testcase.mode
        component.aqbModel.selectDestination = testcase.selectDestination

        selectClickEmitter.emit(testcase.clickEvent)
        fixture.detectChanges()

        if (testcase.result) {
          expect(component.aqbModel.handleElementSelect).toHaveBeenCalledWith(testcase.clickEvent)
        } else {
          expect(component.aqbModel.handleElementSelect).not.toHaveBeenCalledWith(
            testcase.clickEvent
          )
        }
      }
    )

    it('should set the templates to the component once they are received', () => {
      templatesSubject$.next(mockAqbTemplates)
      const mockTemplateIds = mockAqbTemplates.map((template) => template.templateId)
      expect(component.templates).toEqual(mockTemplateIds)
    })

    it('should set the allowedTemplates as templates, if they are specified', () => {})

    it('should emit the close event with the current model, selectedTemplates and the compile result on confirmation with success', async () => {
      const mockCompileResult: IArchetypeQueryBuilderResponse = {
        q: 'test result',
        parameters: { test: 'test' },
      }
      component.selectedTemplates.patchValue(['temp1', 'temp2'])
      jest.spyOn(aqlEditorService, 'buildAql').mockImplementation(() => of(mockCompileResult))
      await component.handleDialogConfirm()

      const expectedOutput: IAqlBuilderDialogOutput = {
        model: component.aqbModel,
        result: mockCompileResult,
        selectedTemplateIds: ['temp1', 'temp2'],
      }
      expect(component.closeDialog.emit).toHaveBeenCalledWith(expectedOutput)
    })

    it('should show an error message if the compiling fails after dialog confirmation', async () => {
      jest.spyOn(aqlEditorService, 'buildAql').mockImplementation(() => throwError('error'))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
      await component.handleDialogConfirm()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(COMPILE_ERROR_CONFIG)
    })

    it('should emit the close event on dialog cancel', () => {
      component.handleDialogCancel()
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the dialog is in data explorer mode', () => {
    const templates = ['temp1', 'temp2']
    beforeEach(() => {
      component.dialogInput = {
        mode: AqlBuilderDialogMode.DataRetrieval,
        model: new AqbUiModel(),
        selectedTemplateIds: templates,
        allowedTemplates: templates,
      }

      fixture.detectChanges()
    })

    it('should not call the api to get all templates', () => {
      expect(aqlEditorService.getTemplates).not.toHaveBeenCalled()
    })

    it('should set the selected and allowed templates', () => {
      expect(component.selectedTemplates.value).toEqual(templates)
      expect(component.templates).toEqual(templates)
    })
  })
})
