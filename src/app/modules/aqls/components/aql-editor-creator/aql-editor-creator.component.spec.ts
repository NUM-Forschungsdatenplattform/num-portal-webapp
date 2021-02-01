import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'

import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'
import { BUILDER_DIALOG_CONFIG } from './constants'

describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  const editorInitEmitter = new EventEmitter<any>()
  @Component({ selector: 'num-code-editor', template: '' })
  class CodeEditorStubComponent {
    @Input() value: string
    @Output() editorInit = editorInitEmitter
  }

  let dialogCallParameter: DialogConfig
  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((callParameter: any) => {
      dialogCallParameter = callParameter
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  const builderResponse: IArchetypeQueryBuilderResponse = {
    parameters: {},
    q: 'test',
  }

  const mockAqlEditorService = ({
    buildAql: jest
      .fn()
      .mockImplementation((aqbModel: IArchetypeQueryBuilder) => of(builderResponse)),
  } as unknown) as AqlEditorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorCreatorComponent, CodeEditorStubComponent, ButtonComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        { provide: AqlEditorService, useValue: mockAqlEditorService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorCreatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the code-editor emits the init event', () => {
    beforeEach(() => {
      editorInitEmitter.emit('test')
    })
    it('should assign the reference to the editor in this componenent', () => {
      expect(component.editor).toEqual('test')
    })
  })

  describe('When a query is supposed to be created with the builder', () => {
    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentComponent: DialogAqlBuilderComponent,
      dialogContentPayload: new AqbUiModel(),
    }

    it('should open the dialog with the config including the content payload', () => {
      component.openBuilderDialog()
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(dialogCallParameter.dialogContentComponent).toEqual(
        dialogConfig.dialogContentComponent
      )
      expect(dialogCallParameter.dialogContentPayload).toEqual(dialogConfig.dialogContentPayload)
    })

    describe('When the builder dialog is confirm-closed', () => {
      const model = new AqbUiModel()
      const convertedModel = model.convertToApi()
      beforeEach(() => {
        component.openBuilderDialog()
        afterClosedSubject$.next(model)
      })
      it('should call the aqlEditorService to generate the query and set the aqlQuery from the response', () => {
        expect(mockAqlEditorService.buildAql).toHaveBeenCalledWith(convertedModel)
        expect(component.aqlQuery).toEqual(builderResponse.q)
      })
    })

    it('should do nothing, when its not a confirm-close', () => {
      jest.spyOn(component, 'handleDialogConfirm')
      component.openBuilderDialog()
      afterClosedSubject$.next()
      expect(component.handleDialogConfirm).not.toHaveBeenCalled()
    })
  })

  describe('When a query is set', () => {
    const testcases = [
      { q: 'This is below 25 characters', result: false },
      {
        q: 'This is above 25 characters but is just not including the important words',
        result: false,
      },
      { q: 'This is above 25 characters but just includes the word select', result: false },
      {
        q: 'This is above 25 characters but just includes the words select, from',
        result: false,
      },
      {
        q: 'This is above 25 characters but just includes the words select, from, contains',
        result: false,
      },
      {
        q:
          'This is above 25 characters and it includes the words select, from, contains, composition',
        result: true,
      },
    ]

    test.each(testcases)('should validate as expected', (testcase) => {
      component.aqlQuery = testcase.q
      expect(component.isValidForExecution).toEqual(testcase.result)
    })
  })
})
