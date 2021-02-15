import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IAqlValidationResponse } from 'src/app/shared/models/archetype-query-builder/aql-validation-response.interface'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'
import {
  BUILDER_DIALOG_CONFIG,
  VALIDATION_ERROR_CONFIG,
  VALIDATION_SUCCESS_CONFIG,
} from './constants'

describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  const monacoEditorMock = {
    IMarkerData: {},
  }

  const monacoMock = {
    editor: monacoEditorMock,
    MarkerSeverity: {
      Error: 'ERROR',
    },
  }

  Object.defineProperty(window, 'monaco', {
    value: monacoMock,
  })

  const editorInitEmitter = new EventEmitter<any>()
  @Component({ selector: 'num-code-editor', template: '' })
  class CodeEditorStubComponent {
    @Input() value: string
    @Input() formatObservable$: any
    @Input() validationObservable$: any
    @Output() editorInit = editorInitEmitter
  }

  let dialogCallParameter: DialogConfig
  const afterClosedSubject$ = new Subject<IAqlBuilderDialogOutput>()
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
    q: 'SELECT this',
  }

  const mockAqlEditorService = ({
    buildAql: jest
      .fn()
      .mockImplementation((aqbModel: IArchetypeQueryBuilder) => of(builderResponse)),
    validateAql: jest.fn(),
  } as unknown) as AqlEditorService

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorCreatorComponent, CodeEditorStubComponent, ButtonComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        { provide: AqlEditorService, useValue: mockAqlEditorService },
        { provide: ToastMessageService, useValue: mockToastMessageService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorCreatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
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
    const dialogContentPayload: IAqlBuilderDialogInput = {
      mode: AqlBuilderDialogMode.AqlEditor,
      model: new AqbUiModel(),
    }
    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentPayload,
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
      const dialogOutput: IAqlBuilderDialogOutput = {
        model: new AqbUiModel(),
        result: {
          parameters: { test: 'test' },
          q: 'test query',
        },
        selectedTemplateIds: ['temp1', 'temp2'],
      }
      beforeEach(() => {
        component.openBuilderDialog()
        afterClosedSubject$.next(dialogOutput)
      })
      it('should set the dialog result to the component', () => {
        expect(component.aqlQuery).toEqual(dialogOutput.result.q)
        expect(component.selectedTemplateIds).toEqual(dialogOutput.selectedTemplateIds)
        expect(component.aqbModel).toEqual(dialogOutput.model)
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

  describe('When the query is supposed to be formatted', () => {
    it('should call next on the subject', (done) => {
      component.formatObservable$.subscribe(() => {
        expect(1).toEqual(1)
        done()
      })

      component.format()
    })
  })

  describe('When the query is supposed to be validated and is valid', () => {
    beforeEach(() => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementation(() => of({ valid: true } as IAqlValidationResponse))
    })
    it('it should display a message to the user that the query is valid and return true', async () => {
      const result = await component.validate(true)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_SUCCESS_CONFIG)
      expect(result).toBeTruthy()
    })

    it('it should not display a message to the user that the query is valid and return true', async () => {
      const result = await component.validate(false)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_SUCCESS_CONFIG)
      expect(result).toBeTruthy()
    })
  })

  describe('When the query is supposed to be validated and is not valid', () => {
    const validationResponse: IAqlValidationResponse = {
      valid: false,
      error: 'test',
      message: 'error message here',
      startColumn: 123,
      startLine: 321,
    }
    beforeEach(() => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementation(() => of(validationResponse))
    })
    it('it should display a message to the user that the query is not valid and return false', async () => {
      const result = await component.validate()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_ERROR_CONFIG)
      expect(result).toBeFalsy()
    })

    it('should push the error markers to the validation observable', async (done) => {
      component.validationObservable$.subscribe((validationResult: any) => {
        expect(validationResult[0]).toBeTruthy()
        expect(validationResult[0].message).toEqual(validationResponse.message)
        expect(validationResult[0].startColumn).toEqual(validationResponse.startColumn)
        expect(validationResult[0].startLineNumber).toEqual(validationResponse.startLine)
        done()
      })
      const result = await component.validate()
      expect(result).toBeFalsy()
    })
  })

  describe('When the validation is not successfull', () => {
    it('should display an error message to the user and return false', async () => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementationOnce(() => throwError('error'))

      const result = await component.validate()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_ERROR_CONFIG)
      expect(result).toBeFalsy()
    })
  })
})
